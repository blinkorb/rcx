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

  return shader;
};
