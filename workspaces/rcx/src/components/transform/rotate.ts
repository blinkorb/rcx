import {
  useRenderAfterChildren,
  useRenderBeforeChildren,
} from '../../hooks/use-render.js';
import { RCXComponent, RCXPropsWithChildren } from '../../types.js';

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
