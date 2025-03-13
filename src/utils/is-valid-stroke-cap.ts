import { isOwnPropertyOf } from './is-own-property-of.ts';

const STROKE_CAPS = {
  butt: true,
  round: true,
  square: true,
} satisfies Record<CanvasLineCap, true>;

export const isValidStrokeCap = (value: unknown): value is CanvasLineCap =>
  typeof value === 'string' && isOwnPropertyOf(STROKE_CAPS, value as string);
