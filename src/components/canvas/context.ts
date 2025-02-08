import { createContext } from '../../create-context.ts';
import type { CanvasContext } from '../../types.ts';

export const canvasContext = createContext<CanvasContext>();
