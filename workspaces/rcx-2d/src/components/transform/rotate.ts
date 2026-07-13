import type { RCXComponent, RCXPropsWithChildren } from '@blinkorb/rcx';
import {
  useRenderAfterChildren,
  useRenderBeforeChildren,
} from '@blinkorb/rcx/hooks';

import { getHasCtx2d } from '../../utils/get-has-ctx-2d.js';

export type RotateProps = RCXPropsWithChildren<{
  rotation: number;
}>;

export const Rotate: RCXComponent<RotateProps> = (props) => {
  useRenderBeforeChildren((renderingContext) => {
    if (getHasCtx2d(renderingContext)) {
      const { rotation } = props;

      renderingContext.ctx2d.save();
      renderingContext.ctx2d.rotate(rotation);
    }
  });

  useRenderAfterChildren((renderingContext) => {
    if (getHasCtx2d(renderingContext)) {
      renderingContext.ctx2d.restore();
    }
  });

  return props.children;
};

Rotate.displayName = 'Rotate';
