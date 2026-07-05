import type { RCXComponent, RCXPropsWithChildren } from '@blinkorb/rcx';
import {
  useRenderAfterChildren,
  useRenderBeforeChildren,
} from '@blinkorb/rcx/hooks';

import { assertCtx2d } from '../../utils/assert-ctx-2d.js';

export type TranslateProps = RCXPropsWithChildren<{
  x?: number;
  y?: number;
}>;

export const Translate: RCXComponent<TranslateProps> = (props) => {
  useRenderBeforeChildren((renderingContext) => {
    assertCtx2d(renderingContext);

    const { x = 0, y = 0 } = props;

    renderingContext.ctx2d.save();
    renderingContext.ctx2d.translate(x, y);
  });

  useRenderAfterChildren((renderingContext) => {
    assertCtx2d(renderingContext);

    renderingContext.ctx2d.restore();
  });

  return props.children;
};

Translate.displayName = 'Translate';
