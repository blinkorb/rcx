import type { RCXComponent, RCXPropsWithChildren } from '@blinkorb/rcx';
import {
  useRenderAfterChildren,
  useRenderBeforeChildren,
} from '@blinkorb/rcx/hooks';

import { assertCtx2d } from '../../utils/assert-ctx-2d.js';

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
    assertCtx2d(renderingContext);

    const { scale, scaleX, scaleY } = props;

    renderingContext.ctx2d.save();
    renderingContext.ctx2d.scale(scaleX ?? scale, scaleY ?? scale);
  });

  useRenderAfterChildren((renderingContext) => {
    assertCtx2d(renderingContext);

    renderingContext.ctx2d.restore();
  });

  return props.children;
};

Scale.displayName = 'Scale';
