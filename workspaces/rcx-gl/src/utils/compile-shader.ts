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

  if ('console' in globalThis && typeof globalThis.console.log === 'function') {
    globalThis.console.log(gl.getShaderInfoLog(shader));
  }

  return shader;
};
