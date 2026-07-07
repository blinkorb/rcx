import type { RCXColorStop } from '@blinkorb/rcx';
import { useInjectRenderingContext } from '@blinkorb/rcx/canvas/context';

import { getHasCtx2d } from '../utils/get-has-ctx-2d.js';

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

  if (!getHasCtx2d(renderingContextState)) {
    throw new Error('Canvas 2D rendering context is unavailable');
  }

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
