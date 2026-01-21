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

export type ArcToProps = RCXPropsWithChildren<{
  startControlX: number;
  startControlY: number;
  endControlX: number;
  endControlY: number;
  radius: number;
  style?: RCXStyleProp<RCXShapeStyle>;
  beginPath?: boolean;
  closePath?: boolean;
}>;

export const ArcTo: RCXComponent<ArcToProps> = (props) => {
  useRenderBeforeChildren((renderingContext) => {
    const { context2D } = renderingContext;

    if (!context2D) {
      return;
    }

    const {
      startControlX,
      startControlY,
      endControlX,
      endControlY,
      radius,
      beginPath = false,
    } = props;

    context2D.save();

    if (beginPath) {
      context2D.beginPath();
    }

    context2D.arcTo(
      startControlX,
      startControlY,
      endControlX,
      endControlY,
      radius
    );
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

ArcTo.displayName = 'ArcTo';
