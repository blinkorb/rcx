import {
  useRenderAfterChildren,
  useRenderBeforeChildren,
} from '../../hooks/use-render.js';
import { CXComponent, PropsWithChildren } from '../../types.js';

export type RotateProps = PropsWithChildren<{
  rotation: number;
}>;

export const Rotate: CXComponent<RotateProps> = (props) => {
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
