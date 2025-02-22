import { useRenderBeforeChildren } from '../../hooks/use-render.ts';
import type {
  CXChildren,
  CXComponent,
  PropsWithChildren,
} from '../../types.ts';
import { isArray } from '../../utils.ts';

export type TextProps = PropsWithChildren<{
  x: number;
  y: number;
  maxWidth?: number;
  children?: CXChildren;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
}>;

const getTextFromChildren = (children: CXChildren): string => {
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

export const Text: CXComponent<TextProps> = (props) => {
  useRenderBeforeChildren((renderingContext) => {
    const { x, y, maxWidth, children, fill, stroke, strokeWidth } = props;

    const text = getTextFromChildren(children);

    renderingContext.ctx2d.save();

    if (typeof fill === 'string') {
      renderingContext.ctx2d.fillStyle = fill;
      renderingContext.ctx2d.fillText(text, x, y, maxWidth);
    }

    if (typeof strokeWidth === 'number') {
      renderingContext.ctx2d.lineWidth = strokeWidth;
    }

    if (typeof stroke === 'string') {
      renderingContext.ctx2d.strokeText(text, x, y, maxWidth);
    }

    renderingContext.ctx2d.restore();
  });

  return null;
};

Text.displayName = 'Text';
