import {
  useRenderAfterChildren,
  useRenderBeforeChildren,
} from '../../hooks/use-render.ts';
import type {
  CXComponent,
  LineStyle,
  PropsWithChildren,
  StyleProp,
} from '../../types.ts';
import { resolveStyles } from '../../utils/resolve-styles.ts';

export type LineProps = PropsWithChildren<{
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  beginPath?: boolean;
  closePath?: boolean;
  style?: StyleProp<LineStyle>;
}>;

export const Line: CXComponent<LineProps> = (props) => {
  useRenderBeforeChildren((renderingContext) => {
    const { startX, startY, endX, endY, beginPath = true } = props;

    renderingContext.ctx2d.save();

    if (beginPath) {
      renderingContext.ctx2d.beginPath();
    }

    renderingContext.ctx2d.moveTo(startX, startY);
    renderingContext.ctx2d.lineTo(endX, endY);
  });

  useRenderAfterChildren((renderingContext) => {
    const { closePath = false } = props;
    const { stroke, strokeWidth } = resolveStyles(props.style);

    if (closePath) {
      renderingContext.ctx2d.closePath();
    }

    if (typeof strokeWidth === 'number') {
      renderingContext.ctx2d.lineWidth = strokeWidth;
    }

    if (typeof stroke === 'string') {
      renderingContext.ctx2d.strokeStyle = stroke;
      renderingContext.ctx2d.stroke();
    }

    renderingContext.ctx2d.restore();
  });

  return props.children;
};

Line.displayName = 'Line';
