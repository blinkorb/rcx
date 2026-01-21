import {
  useRenderAfterChildren,
  useRenderBeforeChildren,
} from '../../hooks/use-render.ts';
import type {
  RCXComponent,
  RCXLineStyle,
  RCXPropsWithChildren,
  RCXStyleProp,
} from '../../types.ts';
import { applyFillAndStrokeStyles } from '../../utils/apply-fill-and-stroke-style.ts';
import { resolveStyles } from '../../utils/resolve-styles.ts';

export type LineProps = RCXPropsWithChildren<{
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  beginPath?: boolean;
  closePath?: boolean;
  style?: RCXStyleProp<RCXLineStyle>;
}>;

export const Line: RCXComponent<LineProps> = (props) => {
  useRenderBeforeChildren((renderingContext) => {
    const { context2D } = renderingContext;

    if (!context2D) {
      return;
    }

    const { startX, startY, endX, endY, beginPath = true } = props;

    context2D.save();

    if (beginPath) {
      context2D.beginPath();
    }

    context2D.moveTo(startX, startY);
    context2D.lineTo(endX, endY);
  });

  useRenderAfterChildren((renderingContext) => {
    const { context2D } = renderingContext;

    if (!context2D) {
      return;
    }

    const { closePath = false } = props;

    if (closePath) {
      context2D.closePath();
    }

    applyFillAndStrokeStyles(renderingContext, resolveStyles(props.style));

    context2D.restore();
  });

  return props.children;
};

Line.displayName = 'Line';
