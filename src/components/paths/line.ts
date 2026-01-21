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
    const { startX, startY, endX, endY, beginPath = true } = props;

    renderingContext.context2D.save();

    if (beginPath) {
      renderingContext.context2D.beginPath();
    }

    renderingContext.context2D.moveTo(startX, startY);
    renderingContext.context2D.lineTo(endX, endY);
  });

  useRenderAfterChildren((renderingContext) => {
    const { closePath = false } = props;

    if (closePath) {
      renderingContext.context2D.closePath();
    }

    applyFillAndStrokeStyles(renderingContext, resolveStyles(props.style));

    renderingContext.context2D.restore();
  });

  return props.children;
};

Line.displayName = 'Line';
