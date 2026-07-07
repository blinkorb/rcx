import type { RCXColorStop } from '@blinkorb/rcx';
import { useInjectRenderingContext } from '@blinkorb/rcx/canvas/context';

import { assertCtx2d } from '../utils/assert-ctx-2d.js';

export interface RadialGradientConfig {
  startX: number;
  startY: number;
  startRadius: number;
  endX: number;
  endY: number;
  endRadius: number;
  stops: readonly RCXColorStop[];
}

export const useRadialGradient = ({
  startX,
  startY,
  startRadius,
  endX,
  endY,
  endRadius,
  stops,
}: RadialGradientConfig) => {
  const renderingContextState = useInjectRenderingContext();

  if (!renderingContextState) {
    throw new Error(
      'useRadialGradient must be called inside the body of a component'
    );
  }

  assertCtx2d(renderingContextState);

  const gradient = renderingContextState.ctx2d.createRadialGradient(
    startX,
    startY,
    startRadius,
    endX,
    endY,
    endRadius
  );

  stops.forEach(({ offset, color }) => {
    gradient.addColorStop(offset, color);
  });

  return gradient;
};
