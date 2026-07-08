import { colorToValidShaderVariableName } from './shader.js';

describe('colorToValidShaderVariableName', () => {
  it('converts colors (of various formats) to valid shader variable names', () => {
    const expectedOutput = 'rgb_255_0_0_1';

    expect(colorToValidShaderVariableName('#f00')).toBe(expectedOutput);
    expect(colorToValidShaderVariableName('#ff0000')).toBe(expectedOutput);
    expect(colorToValidShaderVariableName('#ff0000ff')).toBe(expectedOutput);
    expect(colorToValidShaderVariableName('red')).toBe(expectedOutput);
    expect(colorToValidShaderVariableName('rgb(255, 0, 0)')).toBe(
      expectedOutput
    );
    expect(colorToValidShaderVariableName('rgb(100% 0% 0%)')).toBe(
      expectedOutput
    );
    expect(colorToValidShaderVariableName('rgba(255, 0, 0, 1)')).toBe(
      expectedOutput
    );
    expect(colorToValidShaderVariableName('hsl(0, 100%, 50%)')).toBe(
      expectedOutput
    );
    expect(colorToValidShaderVariableName([1, 0, 0])).toBe(expectedOutput);
    expect(colorToValidShaderVariableName([1, 0, 0, 1])).toBe(expectedOutput);
  });
});
