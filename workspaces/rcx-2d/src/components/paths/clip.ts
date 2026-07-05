import type { RCXComponent, RCXPropsWithChildren } from '@blinkorb/rcx';
import {
  useRenderAfterChildren,
  useRenderBeforeChildren,
} from '@blinkorb/rcx/hooks';

import { assertCtx2d } from '../../utils/assert-ctx-2d.js';

export type ClipProps = RCXPropsWithChildren<{
  path?: Path2D;
  fillRule?: CanvasFillRule;
}>;

export const Clip: RCXComponent<ClipProps> = (props) => {
  useRenderBeforeChildren((renderingContext) => {
    assertCtx2d(renderingContext);

    const { path, fillRule } = props;

    renderingContext.ctx2d.save();

    if (typeof path === 'undefined') {
      renderingContext.ctx2d.clip(fillRule);
    } else {
      renderingContext.ctx2d.clip(path, fillRule);
    }
  });

  useRenderAfterChildren((renderingContext) => {
    assertCtx2d(renderingContext);

    renderingContext.ctx2d.restore();
  });

  return props.children;
};

Clip.displayName = 'Clip';
