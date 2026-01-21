import {
  useRenderAfterChildren,
  useRenderBeforeChildren,
} from '../../hooks/use-render.ts';
import { RCXComponent, RCXPropsWithChildren } from '../../types.ts';

export type ScaleProps =
  | RCXPropsWithChildren<{
      scale: number;
      scaleX?: never;
      scaleY?: never;
    }>
  | RCXPropsWithChildren<{
      scale: never;
      scaleX: number;
      scaleY: number;
    }>;

export const Scale: RCXComponent<ScaleProps> = (props) => {
  useRenderBeforeChildren((renderingContext) => {
    const { scale, scaleX, scaleY } = props;

    renderingContext.context2D.save();
    renderingContext.context2D.scale(scaleX ?? scale, scaleY ?? scale);
  });

  useRenderAfterChildren((renderingContext) => {
    renderingContext.context2D.restore();
  });

  return props.children;
};

Scale.displayName = 'Scale';
