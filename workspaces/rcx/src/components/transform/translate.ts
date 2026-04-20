import {
  useRenderAfterChildren,
  useRenderBeforeChildren,
} from '../../hooks/use-render.ts';
import { RCXComponent, RCXPropsWithChildren } from '../../types.ts';

export type TranslateProps = RCXPropsWithChildren<{
  x?: number;
  y?: number;
}>;

export const Translate: RCXComponent<TranslateProps> = (props) => {
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
