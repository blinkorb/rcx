import { canvasContext } from '../components/canvas/context.ts';
import type { CanvasContext } from '../types.ts';

export const useCanvasContext = () =>
  canvasContext.useInject() as CanvasContext;
