import { useCanvasContext } from '../../hooks/use-canvas-context.ts';
import { useRenderBeforeChildren } from '../../hooks/use-render.ts';
import type { CXComponent, PropsWithChildren } from '../../types.ts';
import { canvasContext } from './context.ts';

export type CanvasProps = PropsWithChildren<{
  width?: number;
  height?: number;
  pixelRatio?: number;
}>;

export const Canvas: CXComponent<CanvasProps> = (props) => {
  const context = useCanvasContext();

  useRenderBeforeChildren((renderingContext) => {
    const mergedProps = {
      ...context.props,
      ...props,
    };

    renderingContext.canvas.width = mergedProps.width * mergedProps.pixelRatio;
    renderingContext.canvas.height =
      mergedProps.height * mergedProps.pixelRatio;
    renderingContext.ctx2d.scale(
      mergedProps.pixelRatio,
      mergedProps.pixelRatio
    );
  });

  canvasContext.useProvide({
    ...context,
    props: {
      ...context.props,
      ...props,
    },
  });

  return props.children;
};

Canvas.displayName = 'Canvas';
