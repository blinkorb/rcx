import { createContext } from '../../create-context.ts';
import type { CXCanvasContext, CXRenderingContext } from '../../types.ts';

export const canvasContext = createContext<CXCanvasContext>();

export const renderingContext = createContext<CXRenderingContext>();
