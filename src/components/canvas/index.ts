import { useRenderBeforeChildren } from '../../hooks/use-render.js';
import type { CXComponent, PropsWithChildren } from '../../types.js';
import { getRecommendedPixelRatio } from '../../utils/get-recommended-pixel-ratio.js';
import { canvasContext, renderingContext } from './context.js';

export type CanvasProps = PropsWithChildren<{
  width?: number;
  height?: number;
  pixelRatio?: number;
}>;

export const Canvas: CXComponent<CanvasProps> = (props) => {
  const renderingContextStateRoot = renderingContext.useInject();

  if (!renderingContextStateRoot) {
    throw new Error('Canvas was rendered outside of an application');
  }

  useRenderBeforeChildren((renderingContextState) => {
    const pixelRatio = props.pixelRatio ?? getRecommendedPixelRatio();
    const width =
      props.width ?? renderingContextState.canvas.width / pixelRatio;
    const height =
      props.height ?? renderingContextState.canvas.height / pixelRatio;

    renderingContextState.canvas.width = width * pixelRatio;
    renderingContextState.canvas.height = height * pixelRatio;
    renderingContextState.ctx2d.scale(pixelRatio, pixelRatio);
  });

  const pixelRatio = props.pixelRatio ?? getRecommendedPixelRatio();
  const width =
    props.width ?? renderingContextStateRoot.canvas.width / pixelRatio;
  const height =
    props.height ?? renderingContextStateRoot.canvas.height / pixelRatio;

  canvasContext.useProvide({
    ...renderingContextStateRoot,
    props: {
      pixelRatio,
      width,
      height,
    },
  });

  return props.children;
};

Canvas.displayName = 'Canvas';
