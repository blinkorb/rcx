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

export interface RCXElement<C extends RCXComponent<P>, P extends AnyObject> {
  type: C;
  props: P;
}

export type RCXElementAny = RCXElement<RCXComponentAny, AnyObject>;

export type RCXChild = RCXElementAny | Primitive;

export type RCXChildren = NestedArray<RCXChild>;

export interface RCXOnMountHook {
  onMount: () => void;
  onUnmount?: () => void;
}

export interface RCXHookMap {
  useReactive: AnyObject;
  useUnreactive: AnyObject;
  useRenderBeforeChildren: (renderingContext: RCXRenderingContext) => void;
  useRenderAfterChildren: (renderingContext: RCXRenderingContext) => void;
  useOnMount: RCXOnMountHook;
  useOnUnmount: () => void;
}

export type RCXHook = {
  [K in keyof RCXHookMap]: {
    type: K;
    value: RCXHookMap[K];
  };
}[keyof RCXHookMap];

export interface RCXNode<C extends RCXComponent<P>, P extends AnyObject> {
  element: RCXElement<C, P>;
  rendered: RCXChildren;
  hooks: RCXHook[];
  childNodes: NestedArray<RCXNodeAny>;
  context: AnyObject;
}

export type RCXNodeAny = RCXNode<RCXComponentAny, AnyObject>;

export interface RCXRenderingContext {
  readonly canvas: HTMLCanvasElement;
  readonly ctx2d: CanvasRenderingContext2D;
}

export interface RCXComponentInterface {
  displayName?: string;
}

export type RCXComponent<P extends AnyObject = Record<PropertyKey, never>> = ((
  props: Readonly<P>
) => RCXChildren) &
  RCXComponentInterface;

export type RCXComponentAny = RCXComponent<AnyObject>;

export type RCXPropsWithChildren<P extends AnyObject> = Omit<P, 'children'> & {
  children?: RCXChildren;
};

export interface RCXCanvasContext {
  readonly props: CanvasProps;
  readonly width: number;
  readonly height: number;
  readonly pixelRatio: number;
  readonly actualWidth: number;
  readonly actualHeight: number;
  readonly canvas: Omit<HTMLCanvasElement, 'width' | 'height'>;
  readonly ctx2d: CanvasRenderingContext2D;
}

export interface RCXGlobal {
  currentNode?: RCXNodeAny;
  hookIndex: number;
}

export interface RCXFragmentProps {
  children?: RCXChildren;
}

export type RCXPoint = [number, number] | { x: number; y: number };

export type RCXStyleProp<T extends AnyObject> = NestedArray<
  false | null | undefined | T
>;

export interface RCXLineStyle {
  stroke?: string;
  strokeWidth?: number;
  strokeCap?: CanvasLineCap;
  strokeJoin?: CanvasLineJoin;
}

export interface RCXShapeStyle extends RCXLineStyle {
  fill?: string;
}

export interface RCXFontStringStyle {
  // font string
  fontStyle?: RCXCanvasFontStyle;
  fontWeight?: RCXCanvasFontWeight;
  fontSize?: number;
  fontFamily?: string;
}

export interface RCXFontStyle extends RCXFontStringStyle {
  // other ctx2d properties
  fontStretch?: CanvasFontStretch;
  fontVariant?: RCXCanvasFontVariant;
  fontKerning?: CanvasFontKerning;
}

export type RCXCanvasFontStyle = 'normal' | 'italic' | 'oblique';
export type RCXCanvasFontWeight =
  | 'normal'
  | 'bold'
  | 'bolder'
  | 'lighter'
  | number;
export type RCXCanvasFontVariant = 'normal' | CanvasFontVariantCaps;

export interface RCXColorStop {
  offset: number;
  color: string;
}
