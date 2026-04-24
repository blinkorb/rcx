export const getRecommendedPixelRatio = () =>
  globalThis.devicePixelRatio >= 2 ? 2 : 1;
