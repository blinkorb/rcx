import { canvasContext } from '../components/canvas/context.js';

export const useCanvasContext = () => {
  const context = canvasContext.useInject();

  if (!context) {
    throw new Error('useCanvasContext must be used inside a Canvas component');
  }

  return context;
};
