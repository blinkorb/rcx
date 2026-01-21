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
    const { context2D } = renderingContext;

    if (!context2D) {
      return;
    }

    const { scale, scaleX, scaleY } = props;

    context2D.save();
    context2D.scale(scaleX ?? scale, scaleY ?? scale);
  });

  useRenderAfterChildren((renderingContext) => {
    const { context2D } = renderingContext;

    if (!context2D) {
      return;
    }

    context2D.restore();
  });

  return props.children;
};

Scale.displayName = 'Scale';
