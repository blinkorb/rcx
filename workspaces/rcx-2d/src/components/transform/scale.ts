import type { RCXComponent, RCXPropsWithChildren } from '@blinkorb/rcx';
import {
  useRenderAfterChildren,
  useRenderBeforeChildren,
} from '@blinkorb/rcx/hooks';

import { getHasCtx2d } from '../../utils/get-has-ctx-2d.js';

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
    if (getHasCtx2d(renderingContext)) {
      const { scale, scaleX, scaleY } = props;

      renderingContext.ctx2d.save();
      renderingContext.ctx2d.scale(scaleX ?? scale, scaleY ?? scale);
    }
  });

  useRenderAfterChildren((renderingContext) => {
    if (getHasCtx2d(renderingContext)) {
      renderingContext.ctx2d.restore();
    }
  });

  return props.children;
};

Scale.displayName = 'Scale';
