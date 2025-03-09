import { useOnMount } from '../../hooks/use-on.ts';
import { useRenderBeforeChildren } from '../../hooks/use-render.ts';
import { useReactive, useUnreactive } from '../../hooks/use-state.ts';
import type { CXComponent, PropsWithChildren } from '../../types.ts';
import { getRecommendedPixelRatio } from '../../utils/get-recommended-pixel-ratio.ts';
import { canvasContext, renderingContext } from './context.ts';

export type CanvasProps = PropsWithChildren<{
  width?: number | 'auto';
  height?: number | 'auto';
  pixelRatio?: number | 'auto';
}>;

const getValueOrAuto = (
  value: undefined | number | 'auto',
  autoValue: number
) => {
  if (typeof value === 'number') {
    return value;
  }

  return autoValue;
};

export const Canvas: CXComponent<CanvasProps> = (props) => {
  const renderingContextStateRoot = renderingContext.useInject();

  if (!renderingContextStateRoot) {
    throw new Error('Canvas was rendered outside of an application');
  }

  const initialCanvasSize =
    renderingContextStateRoot.canvas.getBoundingClientRect();
  const canvasSize = useReactive({
    width: initialCanvasSize.width,
    height: initialCanvasSize.height,
  });
  const resizeObserver = useUnreactive(
    new ResizeObserver((entries) => {
      const canvasEntry = entries[0];
      if (typeof canvasEntry === 'undefined') {
        return;
      }

      const rect = canvasEntry.target.getBoundingClientRect();
      canvasSize.width = rect.width;
      canvasSize.height = rect.height;
    })
  );

  useOnMount(() => {
    resizeObserver.observe(renderingContextStateRoot.canvas);

    return () => {
      resizeObserver.disconnect();
    };
  });

  useRenderBeforeChildren((renderingContextState) => {
    const pixelRatio = getValueOrAuto(
      props.pixelRatio,
      getRecommendedPixelRatio()
    );
    const rect = renderingContextState.canvas.getBoundingClientRect();
    const width =
      getValueOrAuto(props.width, rect.width * pixelRatio) / pixelRatio;
    const height =
      getValueOrAuto(props.height, rect.height * pixelRatio) / pixelRatio;

    renderingContextState.canvas.width = width * pixelRatio;
    renderingContextState.canvas.height = height * pixelRatio;
    renderingContextState.ctx2d.scale(pixelRatio, pixelRatio);
  });

  const pixelRatio = getValueOrAuto(
    props.pixelRatio,
    getRecommendedPixelRatio()
  );
  const rect = renderingContextStateRoot.canvas.getBoundingClientRect();
  const width =
    getValueOrAuto(props.width, rect.width * pixelRatio) / pixelRatio;
  const height =
    getValueOrAuto(props.height, rect.height * pixelRatio) / pixelRatio;

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
