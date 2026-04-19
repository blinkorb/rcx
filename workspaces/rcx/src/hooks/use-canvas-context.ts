import { canvasContext } from '../components/canvas/context.ts';

export const useCanvasContext = () => {
  const context = canvasContext.useInject();

  if (!context) {
    throw new Error('useCanvasContext must be used below a Canvas component');
  }

  return context;
};
