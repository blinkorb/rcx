export const compileShader = (
  gl: WebGLRenderingContext,
  type: number,
  source: string
) => {
  const shader = gl.createShader(type);

  if (!shader) {
    throw new Error(
      `Could not create shader of type ${type} with source "${source}"`
    );
  }

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (
    'console' in globalThis &&
    typeof globalThis.console.warn === 'function'
  ) {
    const output = gl.getShaderInfoLog(shader);
    if (output) {
      globalThis.console.warn(output);
    }
  }

  return shader;
};
