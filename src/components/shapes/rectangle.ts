import {
  useRenderAfterChildren,
  useRenderBeforeChildren,
} from '../../hooks/use-render.ts';
import type {
  RCXComponent,
  RCXPropsWithChildren,
  RCXShapeStyle,
  RCXStyleProp,
} from '../../types.ts';
import { applyFillAndStrokeStyles } from '../../utils/apply-fill-and-stroke-style.ts';
import { resolveStyles } from '../../utils/resolve-styles.ts';

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
    const { context2D } = renderingContext;

    if (!context2D) {
      return;
    }

    const { x, y, width, height, beginPath = true } = props;

    context2D.save();

    if (beginPath) {
      context2D.beginPath();
    }

    context2D.rect(x, y, width, height);
  });

  useRenderAfterChildren((renderingContext) => {
    const { context2D } = renderingContext;

    if (!context2D) {
      return;
    }

    applyFillAndStrokeStyles(renderingContext, resolveStyles(props.style));

    context2D.restore();
  });

  return props.children;
};

Rectangle.displayName = 'Rectangle';
