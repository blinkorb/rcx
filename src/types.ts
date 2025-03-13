import type { CanvasProps } from './components/canvas/index.ts';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    export interface IntrinsicAttributes {
      $key?: string | number;
    }
  }
}

export type Primitive = string | number | boolean | null | undefined;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyObject = Record<PropertyKey, any>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyArray = readonly any[];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyFunction = (...args: any[]) => any;

export type NestedArray<T> = T | readonly NestedArray<T>[];

export interface CXElement<C extends CXComponent<P>, P extends AnyObject> {
  type: C;
  props: P;
}

export type AnyCXElement = CXElement<AnyCXComponent, AnyObject>;

export type CXChild = AnyCXElement | Primitive;

export type CXChildren = NestedArray<CXChild>;

export interface OnMountHook {
  onMount: () => void;
  onUnmount?: () => void;
}

export interface HookMap {
  useReactive: AnyObject;
  useUnreactive: AnyObject;
  useRenderBeforeChildren: (renderingContext: CXRenderingContext) => void;
  useRenderAfterChildren: (renderingContext: CXRenderingContext) => void;
  useOnMount: OnMountHook;
  useOnUnmount: () => void;
}

export type Hook = {
  [K in keyof HookMap]: {
    type: K;
    value: HookMap[K];
  };
}[keyof HookMap];

export interface CXNode<C extends CXComponent<P>, P extends AnyObject> {
  element: CXElement<C, P>;
  rendered: CXChildren;
  hooks: Hook[];
  childNodes: NestedArray<AnyCXNode>;
  context: AnyObject;
}

export type AnyCXNode = CXNode<AnyCXComponent, AnyObject>;

export interface CXRenderingContext {
  readonly canvas: HTMLCanvasElement;
  readonly ctx2d: CanvasRenderingContext2D;
}

export interface CXComponentInterface {
  displayName?: string;
}

export type CXComponent<P extends AnyObject = Record<PropertyKey, never>> = ((
  props: Readonly<P>
) => CXChildren) &
  CXComponentInterface;

export type AnyCXComponent = CXComponent<AnyObject>;

export type PropsWithChildren<P extends AnyObject> = Omit<P, 'children'> & {
  children?: CXChildren;
};

export interface CXCanvasContext {
  readonly props: CanvasProps;
  readonly width: number;
  readonly height: number;
  readonly pixelRatio: number;
  readonly actualWidth: number;
  readonly actualHeight: number;
  readonly canvas: Omit<HTMLCanvasElement, 'width' | 'height'>;
  readonly ctx2d: CanvasRenderingContext2D;
}

export interface CXGlobal {
  currentNode?: AnyCXNode;
  hookIndex: number;
}

export interface FragmentProps {
  children?: CXChildren;
}

export type CXPoint = [number, number] | { x: number; y: number };

export type StyleProp<T extends AnyObject> = NestedArray<
  false | null | undefined | T
>;

export interface LineStyle {
  stroke?: string;
  strokeWidth?: number;
}

export interface ShapeStyle extends LineStyle {
  fill?: string;
}
