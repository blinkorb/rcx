import { createContext } from '../../create-context.js';
import type { CXCanvasContext, CXRenderingContext } from '../../types.js';

export const canvasContext = createContext<CXCanvasContext>();

export const renderingContext = createContext<CXRenderingContext>();
