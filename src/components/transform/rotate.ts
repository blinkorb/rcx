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

    renderingContext.ctx2d.save();
    renderingContext.ctx2d.rotate(rotation);
  });

  useRenderAfterChildren((renderingContext) => {
    renderingContext.ctx2d.restore();
  });

  return props.children;
};

Rotate.displayName = 'Rotate';
