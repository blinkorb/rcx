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
    const { context2D } = renderingContext;

    if (!context2D) {
      return;
    }

    const { path, fillRule } = props;

    context2D.save();

    if (typeof path === 'undefined') {
      context2D.clip(fillRule);
    } else {
      context2D.clip(path, fillRule);
    }
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

Clip.displayName = 'Clip';
