import { useRenderBeforeChildren } from '../../hooks/use-render.ts';
import type {
  RCXChildren,
  RCXComponent,
  RCXHyphens,
  RCXPropsWithChildren,
  RCXRenderingContext,
  RCXStyleProp,
  RCXWhiteSpace,
  RCXWordBreak,
} from '../../types.ts';
import { isValidFillOrStrokeStyle } from '../../utils/is-valid-fill-or-stroke-style.ts';
import { isValidStrokeCap } from '../../utils/is-valid-stroke-cap.ts';
import { isValidStrokeJoin } from '../../utils/is-valid-stroke-join.ts';
import { resolveStyles } from '../../utils/resolve-styles.ts';
import { withPx } from '../../utils/with-px.ts';
import { DEFAULT_FONT_STYLE } from './constants.ts';
import type { TextStyle } from './text.ts';
import { getTextFromChildren } from './utils.ts';

const MATCHES_NEWLINES = /\r\n|\r|\n/g;
const MATCHES_WORD_BREAKS = /\b/g;
const MATCHES_WHITESPACES = /\s+/g;

export interface TextMultilineStyle extends TextStyle {
  wordBreak?: RCXWordBreak;
  lineHeight?: number;
  hyphens?: RCXHyphens;
  whiteSpace?: RCXWhiteSpace;
}

export type TextMultilineProps = RCXPropsWithChildren<{
  x: number;
  y: number;
  width?: number;
  children?: RCXChildren;
  style?: RCXStyleProp<TextMultilineStyle>;
}>;

const getLines = (
  renderingContext: RCXRenderingContext,
  text: string,
  width: number | undefined,
  {
    wordBreak,
    hyphens,
    whiteSpace,
  }: { wordBreak: RCXWordBreak; hyphens: RCXHyphens; whiteSpace: RCXWhiteSpace }
) => {
  console.log('text', text);

  const lines =
    whiteSpace === 'collapse'
      ? text
          .split(MATCHES_NEWLINES)
          .map((line) => line.replace(MATCHES_WHITESPACES, ' ').trim())
      : text.split(MATCHES_NEWLINES);

  if (typeof width !== 'number') {
    return lines;
  }

  if (wordBreak === 'normal') {
    const finalLines: string[] = [];

    lines.forEach((line, lineIndex) => {
      if (
        line === '' ||
        renderingContext.ctx2d.measureText(line).width <= width
      ) {
        return finalLines.push(line);
      }

      let finalLine = '';

      line
        .split(MATCHES_WORD_BREAKS)
        .forEach((wordOrSpaces, wordIndex, context) => {
          if (
            renderingContext.ctx2d.measureText(finalLine + wordOrSpaces)
              .width <= width
          ) {
            finalLine += wordOrSpaces;
            return;
          }
        });

      finalLines.push(finalLine);
    });

    return finalLines;
  }

  return lines;
};

export const TextMultiline: RCXComponent<TextMultilineProps> = (props) => {
  useRenderBeforeChildren((renderingContext) => {
    const { x, y, width, children } = props;
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
      // multiline
      wordBreak = 'normal',
      lineHeight = fontSize,
      hyphens = 'none',
      whiteSpace = 'collapse',
    } = resolveStyles(props.style);

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
    }

    if (isValidFillOrStrokeStyle(fill) || isValidFillOrStrokeStyle(stroke)) {
      const text = getTextFromChildren(children);

      const lines = getLines(renderingContext, text, width, {
        wordBreak,
        hyphens,
        whiteSpace,
      });

      if (isValidFillOrStrokeStyle(fill)) {
        lines.reduce((offset, line) => {
          renderingContext.ctx2d.fillText(line, x, y + offset);
          return offset + lineHeight;
        }, 0);
      }

      if (isValidFillOrStrokeStyle(stroke)) {
        lines.reduce((offset, line) => {
          renderingContext.ctx2d.strokeText(line, x, y + offset);
          return offset + lineHeight;
        }, 0);
      }
    }

    renderingContext.ctx2d.restore();
  });

  return null;
};

TextMultiline.displayName = 'TextMultiline';
