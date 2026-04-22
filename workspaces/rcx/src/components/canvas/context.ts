import { createContext } from '../../context/create-context.js';
import type { RCXCanvasContext, RCXRenderingContext } from '../../types.js';

export const canvasContext = createContext<RCXCanvasContext>();

export const renderingContext = createContext<RCXRenderingContext>();
