import type {
  RCXComponent,
  RCXPropsWithChildren,
  RCXShapeStyle,
  RCXStyleProp,
} from '@blinkorb/rcx';
import { useCanvasContext } from '@blinkorb/rcx/hooks';
import { resolveStyles } from '@blinkorb/rcx/utils';
import Color from 'color';

import { useRenderGl } from '../../hooks/use-render.js';
import { compileShader } from '../../utils/compile-shader.js';

export type RectangleProps = RCXPropsWithChildren<{
  x: number;
  y: number;
  width: number;
  height: number;
  style?: RCXStyleProp<RCXShapeStyle>;
}>;

const vertexShaderSource2d = `
  attribute vec2 aVertex;
  uniform vec2 uOffset;
  uniform vec2 uSize;
  uniform vec2 uCanvasSize;
  uniform float uStrokeWidth;

  void main() {
    vec2 scale = 2.0 / uCanvasSize;
    vec2 effOffset = uOffset - uStrokeWidth * 0.5;
    vec2 effSize = uSize + uStrokeWidth;

    gl_Position = vec4(
      -1.0 + effOffset.x * scale.x + aVertex.x * effSize.x * scale.x,
      +1.0 - effOffset.y * scale.y + aVertex.y * effSize.y * scale.y,
      0.0,
      1.0
    );
  }
`;

const fragmentShaderSourceSolid = `
  precision mediump float;
  uniform vec4 uColor;

  void main() {
    gl_FragColor = uColor;
  }
`;

const vertices = new Float32Array([
  // bottom-left
  0, -1,
  // bottom-right
  1, -1,
  // top-left
  0, 0,
  // top-left  (again)
  0, 0,
  // bottom-right (again)
  1, -1,
  // top-right
  1, 0,
]);

export const Rectangle: RCXComponent<RectangleProps> = (props) => {
  const canvasContext = useCanvasContext();

  useRenderGl({
    setup: (gl) => {
      const program = gl.createProgram();

      gl.attachShader(
        program,
        compileShader(gl, gl.VERTEX_SHADER, vertexShaderSource2d)
      );
      gl.attachShader(
        program,
        compileShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSourceSolid)
      );
      gl.linkProgram(program);

      const verticesBuffer = gl.createBuffer();

      gl.bindBuffer(gl.ARRAY_BUFFER, verticesBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

      const aVertex = gl.getAttribLocation(program, 'aVertex');
      const uOffset = gl.getUniformLocation(program, 'uOffset');
      const uSize = gl.getUniformLocation(program, 'uSize');
      const uCanvasSize = gl.getUniformLocation(program, 'uCanvasSize');
      const uColor = gl.getUniformLocation(program, 'uColor');
      const uStrokeColor = gl.getUniformLocation(program, 'uStrokeColor');
      const uStrokeWidth = gl.getUniformLocation(program, 'uStrokeWidth');

      return {
        program,
        verticesBuffer,
        aVertex,
        uOffset,
        uSize,
        uCanvasSize,
        uColor,
        uStrokeColor,
        uStrokeWidth,
      };
    },
    renderBeforeChildren: (
      gl,
      {
        program,
        verticesBuffer,
        aVertex,
        uOffset,
        uSize,
        uCanvasSize,
        uColor,
        uStrokeColor,
        uStrokeWidth,
      }
    ) => {
      const { x, y, width, height } = props;
      const styles = resolveStyles(props.style);

      gl.useProgram(program);
      gl.bindBuffer(gl.ARRAY_BUFFER, verticesBuffer);
      gl.vertexAttribPointer(aVertex, 2, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(aVertex);

      // The fragment outputs premultiplied alpha so it can composite the
      // straddled, anti-aliased border over the fill in a single pass.
      gl.disable(gl.DEPTH_TEST);
      gl.enable(gl.BLEND);
      gl.blendFuncSeparate(
        gl.SRC_ALPHA,
        gl.ONE_MINUS_SRC_ALPHA, // RGB: normal source-over
        gl.ONE,
        gl.ONE_MINUS_SRC_ALPHA // alpha: standard, keeps 1.0 at 1.0
      );

      gl.uniform2f(uOffset, x, y);
      gl.uniform2f(uSize, width, height);
      gl.uniform2f(uCanvasSize, canvasContext.width, canvasContext.height);

      if (styles.fill) {
        const color = Color(styles.fill);

        gl.uniform4f(
          uColor,
          color.red() / 255,
          color.green() / 255,
          color.blue() / 255,
          color.alpha()
        );
      } else {
        gl.uniform4f(uColor, 0, 0, 0, 0);
      }

      if (styles.stroke && styles.strokeWidth) {
        const color = Color(styles.stroke);

        gl.uniform4f(
          uStrokeColor,
          color.red() / 255,
          color.green() / 255,
          color.blue() / 255,
          color.alpha()
        );
        gl.uniform1f(uStrokeWidth, styles.strokeWidth);
      } else {
        gl.uniform4f(uStrokeColor, 0, 0, 0, 0);
        gl.uniform1f(uStrokeWidth, 0);
      }

      gl.drawArrays(gl.TRIANGLES, 0, 6);
    },
  });

  return props.children;
};

Rectangle.displayName = 'Rectangle';
