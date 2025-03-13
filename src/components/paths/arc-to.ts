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
}>;

export const ArcTo: RCXComponent<ArcToProps> = (props) => {
  useRenderBeforeChildren((renderingContext) => {
    const { startControlX, startControlY, endControlX, endControlY, radius } =
      props;

    renderingContext.ctx2d.save();

    renderingContext.ctx2d.arcTo(
      startControlX,
      startControlY,
      endControlX,
      endControlY,
      radius
    );
  });

  useRenderAfterChildren((renderingContext) => {
    applyFillAndStrokeStyles(renderingContext, resolveStyles(props.style));

    renderingContext.ctx2d.restore();
  });

  return props.children;
};

ArcTo.displayName = 'ArcTo';
