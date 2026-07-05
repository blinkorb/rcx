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
import { applyFillAndStrokeStyles, resolveStyles } from '@blinkorb/rcx/utils';

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
    const {
      startControlX,
      startControlY,
      endControlX,
      endControlY,
      radius,
      beginPath = false,
    } = props;

    renderingContext.ctx2d.save();

    if (beginPath) {
      renderingContext.ctx2d.beginPath();
    }

    renderingContext.ctx2d.arcTo(
      startControlX,
      startControlY,
      endControlX,
      endControlY,
      radius
    );
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

ArcTo.displayName = 'ArcTo';
