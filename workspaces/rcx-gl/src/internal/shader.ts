import Color from 'color';

import { RGBATuple, RGBTuple } from '../types.js';

const MATCHES_DECIMAL = /\./g;

export const colorToValidShaderVariableName = (
  input: string | RGBTuple | RGBATuple
) => {
  if (Array.isArray(input)) {
    return `rgb_${input[0] * 255}_${input[1] * 255}_${input[2] * 255}_${input[3] ?? 1}`.replace(
      MATCHES_DECIMAL,
      'p'
    );
  }

  const color = Color(input);

  return `rgb_${color.red()}_${color.green()}_${color.blue()}_${color.alpha()}`.replace(
    MATCHES_DECIMAL,
    'p'
  );
};
