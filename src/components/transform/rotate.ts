import {
  useRenderAfterChildren,
  useRenderBeforeChildren,
} from '../../hooks/use-render.ts';
import { RCXComponent, RCXPropsWithChildren } from '../../types.ts';

export type RotateProps = RCXPropsWithChildren<{
  rotation: number;
}>;

export const Rotate: RCXComponent<RotateProps> = (props) => {
  useRenderBeforeChildren((renderingContext) => {
    const { context2D } = renderingContext;

    if (!context2D) {
      return;
    }

    const { rotation } = props;

    context2D.save();
    context2D.rotate(rotation);
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

Rotate.displayName = 'Rotate';
