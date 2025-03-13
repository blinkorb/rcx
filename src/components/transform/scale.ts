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

    renderingContext.ctx2d.save();
    renderingContext.ctx2d.scale(scaleX ?? scale, scaleY ?? scale);
  });

  useRenderAfterChildren((renderingContext) => {
    renderingContext.ctx2d.restore();
  });

  return props.children;
};

Scale.displayName = 'Scale';
