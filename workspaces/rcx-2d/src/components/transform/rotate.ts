import type { RCXComponent, RCXPropsWithChildren } from '@blinkorb/rcx';
import {
  useRenderAfterChildren,
  useRenderBeforeChildren,
} from '@blinkorb/rcx/hooks';

import { assertCtx2d } from '../../utils/assert-ctx-2d.js';

export type RotateProps = RCXPropsWithChildren<{
  rotation: number;
}>;

export const Rotate: RCXComponent<RotateProps> = (props) => {
  useRenderBeforeChildren((renderingContext) => {
    assertCtx2d(renderingContext);

    const { rotation } = props;

    renderingContext.ctx2d.save();
    renderingContext.ctx2d.rotate(rotation);
  });

  useRenderAfterChildren((renderingContext) => {
    assertCtx2d(renderingContext);

    renderingContext.ctx2d.restore();
  });

  return props.children;
};

Rotate.displayName = 'Rotate';
