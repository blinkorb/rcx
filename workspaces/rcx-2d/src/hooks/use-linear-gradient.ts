import type { RCXColorStop } from '@blinkorb/rcx';
import { useInjectRenderingContext } from '@blinkorb/rcx/canvas/context';

import { getHasCtx2d } from '../utils/get-has-ctx-2d.js';

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

  if (!getHasCtx2d(renderingContextState)) {
    throw new Error('Canvas 2D rendering context is unavailable');
  }

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
