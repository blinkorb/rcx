import { useRenderBeforeChildren } from '../../hooks/use-render.ts';
import type {
  RCXChildren,
  RCXComponent,
  RCXPropsWithChildren,
  RCXShapeStyle,
  RCXStyleProp,
} from '../../types.ts';
import { isValidStrokeCap } from '../../utils/is-valid-stroke-cap.ts';
import { isValidStrokeJoin } from '../../utils/is-valid-stroke-join.ts';
import { resolveStyles } from '../../utils/resolve-styles.ts';
import { isArray } from '../../utils/type-guards.ts';

export interface TextStyle extends RCXShapeStyle {
  align?: CanvasTextAlign;
  baseline?: CanvasTextBaseline;
}

export type TextProps = RCXPropsWithChildren<{
  x: number;
  y: number;
  maxWidth?: number;

  children?: RCXChildren;
  style?: RCXStyleProp<TextStyle>;
}>;

const getTextFromChildren = (children: RCXChildren): string => {
  if (
    children === null ||
    typeof children === 'boolean' ||
    typeof children === 'undefined'
  ) {
    return '';
  }

  if (typeof children === 'object') {
    if (isArray(children)) {
      return children.reduce<string>(
        (acc, child) => acc + getTextFromChildren(child),
        ''
      );
    }

    return getTextFromChildren(children.props.children);
  }

  return children.toString();
};

export const Text: RCXComponent<TextProps> = (props) => {
  useRenderBeforeChildren((renderingContext) => {
    const { x, y, maxWidth, children } = props;
    const {
      fill,
      stroke,
      strokeWidth,
      strokeCap,
      strokeJoin,
      align,
      baseline,
    } = resolveStyles(props.style);

    const text = getTextFromChildren(children);

    renderingContext.ctx2d.save();

    if (typeof align === 'string') {
      renderingContext.ctx2d.textAlign = align;
    }

    if (typeof baseline === 'string') {
      renderingContext.ctx2d.textBaseline = baseline;
    }

    if (typeof fill === 'string') {
      renderingContext.ctx2d.fillStyle = fill;
      renderingContext.ctx2d.fillText(text, x, y, maxWidth);
    }

    if (typeof strokeWidth === 'number') {
      renderingContext.ctx2d.lineWidth = strokeWidth;
    }

    if (isValidStrokeCap(strokeCap)) {
      renderingContext.ctx2d.lineCap = strokeCap;
    }

    if (isValidStrokeJoin(strokeJoin)) {
      renderingContext.ctx2d.lineJoin = strokeJoin;
    }

    if (typeof stroke === 'string') {
      renderingContext.ctx2d.strokeText(text, x, y, maxWidth);
    }

    renderingContext.ctx2d.restore();
  });

  return null;
};

Text.displayName = 'Text';
