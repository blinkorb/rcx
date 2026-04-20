export const isValidFillOrStrokeStyle = (
  fillOrStrokeStyle: unknown
): fillOrStrokeStyle is string | CanvasGradient =>
  typeof fillOrStrokeStyle === 'string' ||
  fillOrStrokeStyle instanceof CanvasGradient;
