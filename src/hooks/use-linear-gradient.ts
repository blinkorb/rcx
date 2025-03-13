import { renderingContext } from '../components/canvas/context.ts';
import type { RCXColorStop } from '../types.ts';

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
  const renderingContextState = renderingContext.useInject();

  if (!renderingContextState) {
    throw new Error(
      'useLinearGradient must be called inside the body of a component'
    );
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
