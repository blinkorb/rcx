import { useUnreactive } from './use-state.js';

export const useLoop = (callback: () => void) => {
  const unreactive = useUnreactive<{ raf: number | null }>({ raf: null });

  if (typeof unreactive.raf === 'number') {
    globalThis.cancelAnimationFrame(unreactive.raf);
  }

  unreactive.raf = globalThis.requestAnimationFrame(callback);
};
