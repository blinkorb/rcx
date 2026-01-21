import { Canvas, render, useRenderBeforeChildren } from '@blinkorb/rcx';

const Test = () => {
  useRenderBeforeChildren((renderingContext) => {
    const { contextWebGL2: gl } = renderingContext;

    if (!gl) {
      return;
    }

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // --- Shaders ---
    const vs = gl.createShader(gl.VERTEX_SHADER)!;
    gl.shaderSource(
      vs,
      `#version 300 es
      in vec3 aPosition;
      void main() {
        gl_Position = vec4(aPosition, 1.0);
      }
      `
    );
    gl.compileShader(vs);

    const fs = gl.createShader(gl.FRAGMENT_SHADER)!;
    gl.shaderSource(
      fs,
      `#version 300 es
      precision mediump float;
      out vec4 outColor;
      void main() {
        outColor = vec4(1.0);
      }
      `
    );
    gl.compileShader(fs);

    // --- Program ---
    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.useProgram(program);

    // --- REQUIRED in WebGL2 ---
    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);

    // --- Cube vertices (clip space) ---
    const positions = new Float32Array([
      // front face
      -0.5, -0.5, 0.5, 0.5, -0.5, 0.5, 0.5, 0.5, 0.5, -0.5, -0.5, 0.5, 0.5, 0.5,
      0.5, -0.5, 0.5, 0.5,

      // back face
      -0.5, -0.5, -0.5, 0.5, 0.5, -0.5, 0.5, -0.5, -0.5, -0.5, -0.5, -0.5, -0.5,
      0.5, -0.5, 0.5, 0.5, -0.5,

      // left face
      -0.5, -0.5, -0.5, -0.5, -0.5, 0.5, -0.5, 0.5, 0.5, -0.5, -0.5, -0.5, -0.5,
      0.5, 0.5, -0.5, 0.5, -0.5,

      // right face
      0.5, -0.5, -0.5, 0.5, 0.5, 0.5, 0.5, -0.5, 0.5, 0.5, -0.5, -0.5, 0.5, 0.5,
      -0.5, 0.5, 0.5, 0.5,

      // top face
      -0.5, 0.5, -0.5, -0.5, 0.5, 0.5, 0.5, 0.5, 0.5, -0.5, 0.5, -0.5, 0.5, 0.5,
      0.5, 0.5, 0.5, -0.5,

      // bottom face
      -0.5, -0.5, -0.5, 0.5, -0.5, 0.5, -0.5, -0.5, 0.5, -0.5, -0.5, -0.5, 0.5,
      -0.5, -0.5, 0.5, -0.5, 0.5,
    ]);

    const vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const loc = gl.getAttribLocation(program, 'aPosition');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 3, gl.FLOAT, false, 0, 0);

    // --- Draw ---
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clearColor(0.1, 0.1, 0.1, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.TRIANGLES, 0, positions.length / 3);
  });
};

const App = () => {
  return (
    <Canvas>
      <Test />
    </Canvas>
  );
};

render(<App />, document.body, { enableContextWebGL2: true });
