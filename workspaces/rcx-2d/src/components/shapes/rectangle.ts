import type {
  RCXComponent,
  RCXPropsWithChildren,
  RCXShapeStyle,
  RCXStyleProp,
} from '@blinkorb/rcx';
import {
  useRenderAfterChildren,
  useRenderBeforeChildren,
} from '@blinkorb/rcx/hooks';
import { resolveStyles } from '@blinkorb/rcx/utils';

import { applyFillAndStrokeStyles } from '../../utils/apply-fill-and-stroke-style.js';
import { getHasCtx2d } from '../../utils/get-has-ctx-2d.js';

export type RectangleProps = RCXPropsWithChildren<{
  x: number;
  y: number;
  width: number;
  height: number;
  beginPath?: boolean;
  style?: RCXStyleProp<RCXShapeStyle>;
}>;

export const Rectangle: RCXComponent<RectangleProps> = (props) => {
  useRenderBeforeChildren((renderingContext) => {
    if (getHasCtx2d(renderingContext)) {
      const { x, y, width, height, beginPath = true } = props;

      renderingContext.ctx2d.save();

      if (beginPath) {
        renderingContext.ctx2d.beginPath();
      }

      renderingContext.ctx2d.rect(x, y, width, height);
    }
  });

  useRenderAfterChildren((renderingContext) => {
    if (getHasCtx2d(renderingContext)) {
      applyFillAndStrokeStyles(renderingContext, resolveStyles(props.style));

      renderingContext.ctx2d.restore();
    }
  });

  return props.children;
};

Rectangle.displayName = 'Rectangle';
