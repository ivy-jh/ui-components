import type { ReactElement, ReactNode } from 'react';
import { render, renderHook } from '@testing-library/react';
import type { queries, Queries, RenderHookOptions, RenderOptions } from '@testing-library/react';
import { ReadonlyProvider } from '@/context/useReadonly';

type ContextHelperProps = {
  readonly?: boolean;
};

const ContextHelper = (
  props: ContextHelperProps & {
    children: ReactNode;
  }
) => {
  return <ReadonlyProvider readonly={props.readonly ?? false}>{props.children}</ReadonlyProvider>;
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'> & { wrapperProps: ContextHelperProps }) =>
  render(ui, { wrapper: props => <ContextHelper {...props} {...options?.wrapperProps} />, ...options });

const customRenderHook = <
  Result,
  Props,
  Q extends Queries = typeof queries,
  Container extends Element | DocumentFragment = HTMLElement,
  BaseElement extends Element | DocumentFragment = Container
>(
  render: (initialProps: Props) => Result,
  options?: RenderHookOptions<Props, Q, Container, BaseElement> & { wrapperProps: ContextHelperProps }
) => renderHook(render, { wrapper: props => <ContextHelper {...props} {...options?.wrapperProps} />, ...options });

export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
export { customRender as render };
export { customRenderHook as renderHook };
export * from './type-utils';
