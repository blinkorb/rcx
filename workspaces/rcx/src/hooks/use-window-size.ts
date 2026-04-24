import { useOnMount } from './use-on.js';
import { useReactive } from './use-state.js';

export const useWindowSize = () => {
  const size = useReactive({
    width: globalThis.innerWidth,
    height: globalThis.innerHeight,
  });

  useOnMount(() => {
    const onResize = () => {
      size.width = globalThis.innerWidth;
      size.height = globalThis.innerHeight;
    };

    globalThis.addEventListener('resize', onResize);

    return () => {
      globalThis.removeEventListener('resize', onResize);
    };
  });

  return size;
};
