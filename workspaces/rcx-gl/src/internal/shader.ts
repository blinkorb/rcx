import Color from 'color';

const MATCHES_DECIMAL = /\./g;

export const colorToValidShaderVariableName = (input: string) => {
  const color = Color(input);

  return `rgb_${color.red()}_${color.green()}_${color.blue()}_${color.alpha()}`.replace(
    MATCHES_DECIMAL,
    'p'
  );
};
