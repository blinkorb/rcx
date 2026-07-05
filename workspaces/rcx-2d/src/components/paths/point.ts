import type { RCXComponent, RCXPropsWithChildren } from '@blinkorb/rcx';
import { useRenderBeforeChildren } from '@blinkorb/rcx/hooks';

import { assertCtx2d } from '../../utils/assert-ctx-2d.js';

export type PointProps = RCXPropsWithChildren<{
  x: number;
  y: number;
  lineTo?: boolean;
}>;

export const Point: RCXComponent<PointProps> = (props) => {
  useRenderBeforeChildren((renderingContext) => {
    assertCtx2d(renderingContext);

    const { x, y, lineTo = true } = props;

    if (lineTo) {
      renderingContext.ctx2d.lineTo(x, y);
    } else {
      renderingContext.ctx2d.moveTo(x, y);
    }
  });

  return props.children;
};

Point.displayName = 'Point';
