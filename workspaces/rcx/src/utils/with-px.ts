export const withPx = <T extends string | number>(value: T) =>
  (typeof value === 'number' ? `${value}px` : value) as T extends number
    ? `${T}px`
    : T;
