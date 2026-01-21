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
    const { context2D } = renderingContext;

    if (!context2D) {
      return;
    }

    const { x = 0, y = 0 } = props;

    context2D.save();
    context2D.translate(x, y);
  });

  useRenderAfterChildren((renderingContext) => {
    const { context2D } = renderingContext;

    if (!context2D) {
      return;
    }

    context2D.restore();
  });

  return props.children;
};

Translate.displayName = 'Translate';
