import { useOnMount } from './use-on.ts';
import { useReactive } from './use-state.ts';

export const useWindowSize = () => {
  const size = useReactive({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useOnMount(() => {
    const onResize = () => {
      size.width = window.innerWidth;
      size.height = window.innerHeight;
    };

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  });

  return size;
};
