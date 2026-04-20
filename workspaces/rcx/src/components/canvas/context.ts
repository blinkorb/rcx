import { createContext } from '../../context/create-context.ts';
import type { RCXCanvasContext, RCXRenderingContext } from '../../types.ts';

export const canvasContext = createContext<RCXCanvasContext>();

export const renderingContext = createContext<RCXRenderingContext>();
