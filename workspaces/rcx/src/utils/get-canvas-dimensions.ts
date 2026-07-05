export const getCanvasDimensions = (
  element: Element | HTMLCanvasElement | OffscreenCanvas
) => {
  if (element instanceof Element || element instanceof HTMLCanvasElement) {
    return element.getBoundingClientRect();
  }

  return {
    width: element.width,
    height: element.height,
  };
};
