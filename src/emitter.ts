import type { AnyFunction, AnyObject } from './types.js';

type Handler<T extends AnyObject, K extends keyof T> = (
  data: T[K],
  event: K
) => void;

class Emitter<T extends AnyObject> {
  private handlers: {
    [K in keyof T]?: Handler<T, K>[];
  } = {};

  public on = <K extends keyof T>(event: K, handler: Handler<T, K>) => {
    this.handlers[event] = this.handlers[event] || [];
    this.handlers[event]?.push(handler);

    return () => this.off(event, handler);
  };

  public off = <K extends keyof T>(event: K, handler: Handler<T, K>) => {
    const index = this.handlers[event]?.indexOf(handler);

    if (typeof index === 'number' && index >= 0) {
      this.handlers[event]?.splice(index, 1);
    }
  };

  public emit = <K extends keyof T>(event: K, data: T[K]) => {
    this.handlers[event]?.forEach((handler) => handler(data, event));
  };
}

export const emitter = new Emitter<{
  render: null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  registerState: any;
  registerBeforeChildren: AnyFunction;
  registerAfterChildren: AnyFunction;
}>();
