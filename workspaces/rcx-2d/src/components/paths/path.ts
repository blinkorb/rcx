import type {
  RCXComponent,
  RCXPoint,
  RCXPropsWithChildren,
  RCXShapeStyle,
  RCXStyleProp,
} from '@blinkorb/rcx';
import {
  useRenderAfterChildren,
  useRenderBeforeChildren,
} from '@blinkorb/rcx/hooks';
import {
  applyFillAndStrokeStyles,
  isArray,
  resolveStyles,
} from '@blinkorb/rcx/utils';

export type PathProps = RCXPropsWithChildren<{
  points?: readonly RCXPoint[];
  beginPath?: boolean;
  closePath?: boolean;
  style?: RCXStyleProp<RCXShapeStyle>;
}>;

export const Path: RCXComponent<PathProps> = (props) => {
  useRenderBeforeChildren((renderingContext) => {
    const { points, beginPath = true } = props;

    renderingContext.ctx2d.save();

    if (beginPath) {
      renderingContext.ctx2d.beginPath();
    }

    points?.forEach((point, index) => {
      const [x, y] = isArray(point) ? point : [point.x, point.y];

      if (index === 0) {
        renderingContext.ctx2d.moveTo(x, y);
      } else {
        renderingContext.ctx2d.lineTo(x, y);
      }
    });
  });

  useRenderAfterChildren((renderingContext) => {
    const { closePath = false } = props;

    if (closePath) {
      renderingContext.ctx2d.closePath();
    }

    applyFillAndStrokeStyles(renderingContext, resolveStyles(props.style));

    renderingContext.ctx2d.restore();
  });

  return props.children;
};

Path.displayName = 'Path';
