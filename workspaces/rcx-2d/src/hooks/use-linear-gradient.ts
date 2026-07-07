import type { RCXColorStop } from '@blinkorb/rcx';
import { useInjectRenderingContext } from '@blinkorb/rcx/canvas/context';

import { assertCtx2d } from '../utils/assert-ctx-2d.js';

export interface LinearGradientConfig {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  stops: readonly RCXColorStop[];
}

export const useLinearGradient = ({
  startX,
  startY,
  endX,
  endY,
  stops,
}: LinearGradientConfig) => {
  const renderingContextState = useInjectRenderingContext();

  if (!renderingContextState) {
    throw new Error(
      'useLinearGradient must be called inside the body of a component'
    );
  }

  assertCtx2d(renderingContextState);

  const gradient = renderingContextState.ctx2d.createLinearGradient(
    startX,
    startY,
    endX,
    endY
  );

  stops.forEach(({ offset, color }) => {
    gradient.addColorStop(offset, color);
  });

  return gradient;
};
