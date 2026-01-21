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
    const { rotation } = props;

    renderingContext.context2D.save();
    renderingContext.context2D.rotate(rotation);
  });

  useRenderAfterChildren((renderingContext) => {
    renderingContext.context2D.restore();
  });

  return props.children;
};

Rotate.displayName = 'Rotate';
