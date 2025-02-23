import {
  useRenderAfterChildren,
  useRenderBeforeChildren,
} from '../../hooks/use-render.ts';
import { CXComponent, PropsWithChildren } from '../../types.ts';

export type TranslateProps = PropsWithChildren<{
  x?: number;
  y?: number;
}>;

export const Translate: CXComponent<TranslateProps> = (props) => {
  useRenderBeforeChildren((renderingContext) => {
    const { x = 0, y = 0 } = props;

    renderingContext.ctx2d.save();
    renderingContext.ctx2d.translate(x, y);
  });

  useRenderAfterChildren((renderingContext) => {
    renderingContext.ctx2d.restore();
  });

  return props.children;
};

Translate.displayName = 'Translate';
