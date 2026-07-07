import type { RCXComponent, RCXPropsWithChildren } from '@blinkorb/rcx';
import {
  useRenderAfterChildren,
  useRenderBeforeChildren,
} from '@blinkorb/rcx/hooks';

import { getHasCtx2d } from '../../utils/get-has-ctx-2d.js';

export type TranslateProps = RCXPropsWithChildren<{
  x?: number;
  y?: number;
}>;

export const Translate: RCXComponent<TranslateProps> = (props) => {
  useRenderBeforeChildren((renderingContext) => {
    if (getHasCtx2d(renderingContext)) {
      const { x = 0, y = 0 } = props;

      renderingContext.ctx2d.save();
      renderingContext.ctx2d.translate(x, y);
    }
  });

  useRenderAfterChildren((renderingContext) => {
    if (getHasCtx2d(renderingContext)) {
      renderingContext.ctx2d.restore();
    }
  });

  return props.children;
};

Translate.displayName = 'Translate';
