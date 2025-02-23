import {
  useRenderAfterChildren,
  useRenderBeforeChildren,
} from '../../hooks/use-render.ts';
import { CXComponent, PropsWithChildren } from '../../types.ts';

export type ScaleProps =
  | PropsWithChildren<{
      scale: number;
      scaleX?: never;
      scaleY?: never;
    }>
  | PropsWithChildren<{
      scale: never;
      scaleX: number;
      scaleY: number;
    }>;

export const Scale: CXComponent<ScaleProps> = (props) => {
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
