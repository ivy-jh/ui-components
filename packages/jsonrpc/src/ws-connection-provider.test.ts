import { expect } from 'vitest';
import { WS } from 'vitest-websocket-mock';
import { webSocketConnection, type Connection, type WebSocketConnectionHandler, type WebSocketOptions } from './ws-connection-provider';
import { createMessageConnection } from 'vscode-jsonrpc';
import { BaseRpcClient } from './base-rpc-client';

afterEach(async () => {
  WS.clean();
  vi.restoreAllMocks();
});

const setupConnection = async <T>(handler: WebSocketConnectionHandler<T>, options?: WebSocketOptions) => {
  const server = new WS('ws://localhost:1234', { jsonProtocol: true });
  const { listen } = webSocketConnection<T>('ws://localhost:1234', options);
  const connection = await listen(handler);
  await server.connected;
  return { server, connection };
};

const testHandler: WebSocketConnectionHandler<Connection> = {
  onConnection: connection => connection,
  onReconnect: connection => connection
};

const initialize = (connection: Connection) => {
  const client = new TestRpcClient(createMessageConnection(connection.reader, connection.writer));
  client.start();
  return client;
};
const testRpcHandler: WebSocketConnectionHandler<TestRpcClient> = {
  onConnection: initialize,
  onReconnect: (connection, oldClient) => {
    oldClient.stop();
    return initialize(connection);
  }
};

describe('messages', () => {
  test('send notification to server', async () => {
    const { server, connection } = await setupConnection(testHandler);
    const client = createMessageConnection(connection.reader, connection.writer);
    client.sendNotification('test', 'hi from client');
    await expect(server).toReceiveMessage({ jsonrpc: '2.0', method: 'test', params: ['hi from client'] });
  });

  test('send notification to client', async () => {
    const { server, connection } = await setupConnection(testRpcHandler);
    const response = connection.waitForNotification('test');
    server.send({ jsonrpc: '2.0', method: 'test', params: ['hi from server'] });
    const message = await response;
    expect(message).toEqual('hi from server');
  });

  test('send request to server', async () => {
    const { server, connection } = await setupConnection(testRpcHandler);
    const response = connection.sendRequest('test', 'hi from client');

    const request = await server.nextMessage;
    expect(request).toEqual({ jsonrpc: '2.0', id: 0, method: 'test', params: ['hi from client'] });
    server.send({ jsonrpc: '2.0', id: 0, result: 'response from server' });

    const message = await response;
    expect(message).toEqual('response from server');
  });
});

describe('handler', () => {
  const onConnection = vi.fn(conn => conn);
  const onReconnect = vi.fn(conn => conn);

  test('reconnect', async () => {
    expect(onConnection).not.toHaveBeenCalled();
    const { server } = await setupConnection({ onConnection, onReconnect }, { reconnectDelay: 100 });
    expect(onConnection).toHaveBeenCalled();
    expect(onReconnect).not.toHaveBeenCalled();
    server.server.clients()[0].close();
    await server.connected;
    await vi.waitFor(() => expect(onReconnect).toHaveBeenCalled());
  });
});

describe('reconnect', () => {
  const logger = {
    error: vi.fn(),
    warn: vi.fn(),
    info: vi.fn(),
    log: vi.fn()
  };

  test('reconnect', async () => {
    const { server } = await setupConnection({ ...testHandler, logger }, { reconnectDelay: 100 });
    expect(logger.log).toHaveBeenCalledWith('Connection established!');
    server.server.clients()[0].close();
    await server.connected;
    await vi.waitFor(() => expect(logger.warn).toHaveBeenCalledWith('Trying to reconnect...'));
    await vi.waitFor(() => expect(logger.info).toHaveBeenCalledWith('Reconnected!'));
  });

  test('no reconnect', async () => {
    const { server } = await setupConnection({ ...testHandler, logger }, { reconnect: false });
    expect(logger.log).toHaveBeenCalledWith('Connection established!');
    server.server.clients()[0].close();
    await vi.waitFor(() => expect(logger.error).toHaveBeenCalledWith('Connection was closed, will not reconnect!'));
  });

  test('reconnect attempts', async () => {
    const { server } = await setupConnection({ ...testHandler, logger }, { reconnectAttempts: 0 });
    expect(logger.log).toHaveBeenCalledWith('Connection established!');
    server.server.clients()[0].close();
    await vi.waitFor(() => expect(logger.error).toHaveBeenCalledWith('Reconnection failed. Tried 0 times.'));
  });
});

class TestRpcClient extends BaseRpcClient {
  sendRequest(method: string, params: unknown): Promise<unknown> {
    return this.connection.sendRequest(method, params);
  }

  async waitForNotification(method: string): Promise<string> {
    let notification: string | undefined = undefined;
    this.connection.onNotification(method, msg => (notification = msg));
    await new Promise<void>(resolve => {
      const waitForMessages = () => {
        if (notification) resolve();
        setTimeout(waitForMessages, 1);
      };
      waitForMessages();
    });
    return notification ?? '';
  }
}
