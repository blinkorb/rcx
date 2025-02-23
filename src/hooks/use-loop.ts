import { useUnreactive } from './use-state.ts';

export const useLoop = (callback: () => void) => {
  const unreactive = useUnreactive<{ raf: number | null }>({ raf: null });

  if (typeof unreactive.raf === 'number') {
    window.cancelAnimationFrame(unreactive.raf);
  }

  unreactive.raf = window.requestAnimationFrame(callback);
};
