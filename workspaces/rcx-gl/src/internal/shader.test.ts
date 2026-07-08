import { colorToValidShaderVariableName } from './shader.js';

describe('colorToValidShaderVariableName', () => {
  it('converts colors (of various formats) to valid shader variable names', () => {
    expect(colorToValidShaderVariableName('#f00')).toBe('rgb_255_0_0_1');
    expect(colorToValidShaderVariableName('#ff0000')).toBe('rgb_255_0_0_1');
    expect(colorToValidShaderVariableName('red')).toBe('rgb_255_0_0_1');
    expect(colorToValidShaderVariableName('rgb(255, 0, 0)')).toBe(
      'rgb_255_0_0_1'
    );
    expect(colorToValidShaderVariableName('rgba(255, 0, 0, 1)')).toBe(
      'rgb_255_0_0_1'
    );
    expect(colorToValidShaderVariableName('hsl(0, 100%, 50%)')).toBe(
      'rgb_255_0_0_1'
    );
    expect(colorToValidShaderVariableName([1, 0, 0])).toBe('rgb_255_0_0_1');
    expect(colorToValidShaderVariableName([1, 0, 0, 1])).toBe('rgb_255_0_0_1');
  });
});
