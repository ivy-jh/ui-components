/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { Logger, MessageReader, MessageWriter } from 'vscode-jsonrpc';
import { WebSocketMessageReader, WebSocketMessageWriter, wrap } from './ws-connection';

export interface Connection {
  reader: MessageReader;
  writer: MessageWriter;
}

export type WebSocketConnectionHandler<TConnection> = {
  onConnection: (connection: Connection) => TConnection | Promise<TConnection>;
  onReconnect: (connection: Connection, oldConnection: TConnection) => TConnection | Promise<TConnection>;
  logger?: Logger;
};

export type WebSocketOptions = {
  /**
   * Allow to reconnect to the server.
   * @default true
   */
  reconnect?: boolean;
  /**
   * Max attempts to reconnect to the server.
   * @default Infinity
   */
  reconnectAttempts?: number;
  /**
   * The delay between reconnection attempts.
   * @default 1000
   */
  reconnectDelay?: number;
  connectedMessage?: string;
  reconnectedMessage?: string;
  errorMessage?: string;
  reconnectingMessage?: string;
  reconnectFailedMessage?: string;
  closeMessage?: string;
  abortSignal?: AbortSignal;
};

const defaultOptions: Required<Omit<WebSocketOptions, 'abortSignal'>> = {
  reconnect: true,
  reconnectAttempts: Infinity,
  reconnectDelay: 1000,
  connectedMessage: 'Connection established!',
  reconnectedMessage: 'Reconnected!',
  errorMessage: 'Connection could not be established. Please make sure that the server is running!',
  reconnectingMessage: 'Trying to reconnect...',
  reconnectFailedMessage: 'Reconnection failed. Tried {attempts} times.',
  closeMessage: 'Connection was closed, will not reconnect!'
} as const;

export const webSocketConnection = <TConnection = Connection>(url: string | URL, initOptions?: WebSocketOptions) => {
  const options = { ...defaultOptions, ...initOptions };
  let webSocket: WebSocket | undefined;
  let connection: TConnection | undefined;
  let reconnectTimeout: NodeJS.Timeout;
  let reconnectAttempts = 0;

  const listen = async (handler: WebSocketConnectionHandler<TConnection>, isReconnecting = false): Promise<TConnection> => {
    webSocket = new WebSocket(url);

    webSocket.onerror = () => {
      handler.logger?.error(options.errorMessage);
      clearInterval(reconnectTimeout);
      webSocket?.close();
    };

    connection = await new Promise<TConnection>(resolve => {
      webSocket!.onopen = () => {
        clearInterval(reconnectTimeout);
        const wrappedSocket = wrap(webSocket!);
        const newConnection = { reader: new WebSocketMessageReader(wrappedSocket), writer: new WebSocketMessageWriter(wrappedSocket) };

        webSocket!.onclose = () => {
          if (options.abortSignal?.aborted) {
            return;
          }
          const { reconnect, reconnectAttempts: attempts, reconnectDelay } = options;
          if (reconnect) {
            if (reconnectAttempts >= attempts) {
              handler.logger?.error(options.reconnectFailedMessage.replace('{attempts}', attempts.toString()));
            } else {
              reconnectTimeout = setTimeout(() => {
                handler.logger?.warn(options.reconnectingMessage);
                listen(handler, true);
                reconnectAttempts++;
              }, reconnectDelay);
            }
          } else {
            handler.logger?.error(options.closeMessage);
          }
        };

        if (isReconnecting) {
          handler.logger?.info(options.reconnectedMessage);
          resolve(handler.onReconnect(newConnection, connection!));
        } else {
          handler.logger?.log(options.connectedMessage);
          resolve(handler.onConnection(newConnection));
        }
      };
    });
    if (options.abortSignal?.aborted) {
      webSocket?.close();
    } else {
      options.abortSignal?.addEventListener('abort', () => {
        webSocket?.close();
      });
    }
    return connection;
  };

  return { listen };
};
