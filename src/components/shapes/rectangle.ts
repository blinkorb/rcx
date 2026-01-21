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
    const { x, y, width, height, beginPath = true } = props;

    renderingContext.context2D.save();

    if (beginPath) {
      renderingContext.context2D.beginPath();
    }

    renderingContext.context2D.rect(x, y, width, height);
  });

  useRenderAfterChildren((renderingContext) => {
    applyFillAndStrokeStyles(renderingContext, resolveStyles(props.style));

    renderingContext.context2D.restore();
  });

  return props.children;
};

Rectangle.displayName = 'Rectangle';
