import { renderingContext } from '../components/canvas/context.ts';
import type { RCXColorStop } from '../types.ts';

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
  const renderingContextState = renderingContext.useInject();

  if (!renderingContextState) {
    throw new Error(
      'useRadialGradient must be called inside the body of a component'
    );
  }

  const gradient = renderingContextState.context2D.createRadialGradient(
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
