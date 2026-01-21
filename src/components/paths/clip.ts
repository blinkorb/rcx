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

    renderingContext.context2D.save();

    if (typeof path === 'undefined') {
      renderingContext.context2D.clip(fillRule);
    } else {
      renderingContext.context2D.clip(path, fillRule);
    }
  });

  useRenderAfterChildren((renderingContext) => {
    renderingContext.context2D.restore();
  });

  return props.children;
};

Clip.displayName = 'Clip';
