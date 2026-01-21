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
import { withPx } from '../../utils/with-px.ts';
import { DEFAULT_FONT_STYLE } from './constants.ts';
import { getTextFromChildren } from './utils.ts';

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

    renderingContext.ctx2d.save();

    if (typeof align === 'string') {
      renderingContext.ctx2d.textAlign = align;
    }

    if (typeof baseline === 'string') {
      renderingContext.ctx2d.textBaseline = baseline;
    }

    renderingContext.ctx2d.font = [
      fontStyle,
      fontWeight,
      withPx(fontSize),
      fontFamily,
    ].join(' ');

    renderingContext.ctx2d.fontStretch = fontStretch;
    renderingContext.ctx2d.fontVariantCaps = fontVariant;
    renderingContext.ctx2d.fontKerning = fontKerning;

    if (isValidFillOrStrokeStyle(fill)) {
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

    if (isValidFillOrStrokeStyle(stroke)) {
      renderingContext.ctx2d.strokeStyle = stroke;
      renderingContext.ctx2d.strokeText(text, x, y, maxWidth);
    }

    renderingContext.ctx2d.restore();
  });

  return null;
};

Text.displayName = 'Text';
