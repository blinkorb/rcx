import { useUnreactive } from './use-state.js';

export const useCurrentReference = <T>(value: T) => {
  const unreactive = useUnreactive<{ current: T }>({ current: value });

  unreactive.current = value;

  return unreactive;
};
