import { useOnMount } from '../hooks/use-on.js';
import { useRenderBeforeChildren } from '../hooks/use-render.js';
import { useReactive, useUnreactive } from '../hooks/use-state.js';
import type { RCXComponent, RCXPropsWithChildren } from '../types.js';
import { getCanvasDimensions } from '../utils/get-canvas-dimensions.js';
import { getCanvasElement } from '../utils/get-canvas-element.js';
import { getRecommendedPixelRatio } from '../utils/get-recommended-pixel-ratio.js';
import { isFiniteNumber } from '../utils/is-finite-number.js';
import {
  useInjectRenderingContext,
  useProvideCanvasContext,
} from './context.js';

export type CanvasProps = RCXPropsWithChildren<{
  width?: number | 'auto';
  height?: number | 'auto';
  pixelRatio?: number | 'auto';
}>;

const getValueOrAuto = (
  value: undefined | number | 'auto',
  autoValue: number
) => {
  if (isFiniteNumber(value)) {
    return value;
  }

  return autoValue;
};

export const Canvas: RCXComponent<CanvasProps> = (props) => {
  const renderingContextStateRoot = useInjectRenderingContext();

  if (!renderingContextStateRoot) {
    throw new Error('Canvas was rendered outside of an RCX application');
  }

  const initialCanvasSize = getCanvasDimensions(
    getCanvasElement(renderingContextStateRoot)
  );

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

      const rect = getCanvasDimensions(canvasEntry.target);
      canvasSize.width = rect.width;
      canvasSize.height = rect.height;
    })
  );

  useOnMount(() => {
    const element = getCanvasElement(renderingContextStateRoot);

    if (element instanceof HTMLCanvasElement) {
      resizeObserver.observe(element);
    }

    return () => {
      resizeObserver.disconnect();
    };
  });

  useRenderBeforeChildren((renderingContextState) => {
    const pixelRatio = getValueOrAuto(
      props.pixelRatio,
      getRecommendedPixelRatio()
    );
    const element = getCanvasElement(renderingContextState);
    const rect = getCanvasDimensions(element);
    const width =
      getValueOrAuto(props.width, rect.width * pixelRatio) / pixelRatio;
    const height =
      getValueOrAuto(props.height, rect.height * pixelRatio) / pixelRatio;

    element.width = width * pixelRatio;
    element.height = height * pixelRatio;
    renderingContextState.ctx2d?.scale(pixelRatio, pixelRatio);

    renderingContextState.ctxGl?.viewport(
      0,
      0,
      width * pixelRatio,
      height * pixelRatio
    );
  });

  const pixelRatio = getValueOrAuto(
    props.pixelRatio,
    getRecommendedPixelRatio()
  );
  const rect = getCanvasDimensions(getCanvasElement(renderingContextStateRoot));
  const width =
    getValueOrAuto(props.width, rect.width * pixelRatio) / pixelRatio;
  const height =
    getValueOrAuto(props.height, rect.height * pixelRatio) / pixelRatio;

  useProvideCanvasContext({
    ...renderingContextStateRoot,
    props,
    width,
    height,
    pixelRatio,
    actualWidth: width * pixelRatio,
    actualHeight: height * pixelRatio,
  });

  return props.children;
};

Canvas.displayName = 'Canvas';
