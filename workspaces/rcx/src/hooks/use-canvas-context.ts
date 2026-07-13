import { useInjectCanvasContext } from '../canvas/context.js';

export const useCanvasContext = () => {
  const context = useInjectCanvasContext();

  if (!context) {
    throw new Error('useCanvasContext must be used below a Canvas component');
  }

  return context;
};
