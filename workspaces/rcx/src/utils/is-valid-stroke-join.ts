import { isOwnPropertyOf } from './is-own-property-of.js';

const STROKE_JOINS = {
  bevel: true,
  round: true,
  miter: true,
} satisfies Record<CanvasLineJoin, true>;

export const isValidStrokeJoin = (value: unknown): value is CanvasLineJoin =>
  typeof value === 'string' && isOwnPropertyOf(STROKE_JOINS, value);
