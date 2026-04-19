import {
  useRenderAfterChildren,
  useRenderBeforeChildren,
} from '../../hooks/use-render.ts';
import type { RCXComponent, RCXPropsWithChildren } from '../../types.ts';

export type ClipProps = RCXPropsWithChildren<{
  path?: Path2D;
  fillRule?: CanvasFillRule;
}>;

export const Clip: RCXComponent<ClipProps> = (props) => {
  useRenderBeforeChildren((renderingContext) => {
    const { path, fillRule } = props;

    renderingContext.ctx2d.save();

    if (typeof path === 'undefined') {
      renderingContext.ctx2d.clip(fillRule);
    } else {
      renderingContext.ctx2d.clip(path, fillRule);
    }
  });

  useRenderAfterChildren((renderingContext) => {
    renderingContext.ctx2d.restore();
  });

  return props.children;
};

Clip.displayName = 'Clip';
