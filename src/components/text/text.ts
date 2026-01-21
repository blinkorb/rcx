import { useRenderBeforeChildren } from '../../hooks/use-render.ts';
import type {
  RCXChildren,
  RCXComponent,
  RCXFontStyle,
  RCXPropsWithChildren,
  RCXShapeStyle,
  RCXStyleProp,
} from '../../types.ts';
import { isValidFillOrStrokeStyle } from '../../utils/is-valid-fill-or-stroke-style.ts';
import { isValidStrokeCap } from '../../utils/is-valid-stroke-cap.ts';
import { isValidStrokeJoin } from '../../utils/is-valid-stroke-join.ts';
import { resolveStyles } from '../../utils/resolve-styles.ts';
import { isArray } from '../../utils/type-guards.ts';
import { withPx } from '../../utils/with-px.ts';

export interface TextStyle extends RCXShapeStyle, RCXFontStyle {
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

const DEFAULT_FONT_STYLE = {
  // font string
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontSize: 10,
  fontFamily: 'sans-serif',
  // other ctx2d properties
  fontStretch: 'normal',
  fontVariant: 'normal',
  fontKerning: 'normal',
} satisfies Required<RCXFontStyle>;

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
      fontStyle = DEFAULT_FONT_STYLE.fontStyle,
      fontWeight = DEFAULT_FONT_STYLE.fontWeight,
      fontSize = DEFAULT_FONT_STYLE.fontSize,
      fontFamily = DEFAULT_FONT_STYLE.fontFamily,
      // other ctx2d properties
      fontStretch = DEFAULT_FONT_STYLE.fontStretch,
      fontVariant = DEFAULT_FONT_STYLE.fontVariant,
      fontKerning = DEFAULT_FONT_STYLE.fontKerning,
    } = resolveStyles(props.style);

    const text = getTextFromChildren(children);

    renderingContext.context2D.save();

    if (typeof align === 'string') {
      renderingContext.context2D.textAlign = align;
    }

    if (typeof baseline === 'string') {
      renderingContext.context2D.textBaseline = baseline;
    }

    renderingContext.context2D.font = [
      fontStyle,
      fontWeight,
      withPx(fontSize),
      fontFamily,
    ].join(' ');

    renderingContext.context2D.fontStretch = fontStretch;
    renderingContext.context2D.fontVariantCaps = fontVariant;
    renderingContext.context2D.fontKerning = fontKerning;

    if (isValidFillOrStrokeStyle(fill)) {
      renderingContext.context2D.fillStyle = fill;
      renderingContext.context2D.fillText(text, x, y, maxWidth);
    }

    if (typeof strokeWidth === 'number') {
      renderingContext.context2D.lineWidth = strokeWidth;
    }

    if (isValidStrokeCap(strokeCap)) {
      renderingContext.context2D.lineCap = strokeCap;
    }

    if (isValidStrokeJoin(strokeJoin)) {
      renderingContext.context2D.lineJoin = strokeJoin;
    }

    if (isValidFillOrStrokeStyle(stroke)) {
      renderingContext.context2D.strokeStyle = stroke;
      renderingContext.context2D.strokeText(text, x, y, maxWidth);
    }

    renderingContext.context2D.restore();
  });

  return null;
};

Text.displayName = 'Text';
