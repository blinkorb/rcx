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
  uniform float uPixelRatio;

  void main() {
    gl_Position = vec4(
      ((aVertex.x/uCanvasSize.x)*uSize.x + (uOffset.x/uCanvasSize.x)) * uPixelRatio - 1.0,
      ((aVertex.y/uCanvasSize.y)*uSize.y - (uOffset.y/uCanvasSize.y)) * uPixelRatio + 1.0,
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
      gl.useProgram(program);

      const buffer = gl.createBuffer();

      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

      const aVertex = gl.getAttribLocation(program, 'aVertex');
      const uOffset = gl.getUniformLocation(program, 'uOffset');
      const uSize = gl.getUniformLocation(program, 'uSize');
      const uCanvasSize = gl.getUniformLocation(program, 'uCanvasSize');
      const uPixelRatio = gl.getUniformLocation(program, 'uPixelRatio');
      const uColor = gl.getUniformLocation(program, 'uColor');

      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.enableVertexAttribArray(aVertex);
      gl.vertexAttribPointer(aVertex, 2, gl.FLOAT, false, 0, 0);

      return {
        uOffset,
        uSize,
        uCanvasSize,
        uPixelRatio,
        uColor,
      };
    },
    renderBeforeChildren: (
      gl,
      { uOffset, uSize, uCanvasSize, uPixelRatio, uColor }
    ) => {
      const { x, y, width, height } = props;
      const styles = resolveStyles(props.style);

      gl.uniform2f(uOffset, x, y);
      gl.uniform2f(uSize, width, height);
      gl.uniform2f(uCanvasSize, canvasContext.width, canvasContext.height);
      gl.uniform1f(uPixelRatio, canvasContext.pixelRatio);

      if (styles.fill) {
        const color = Color(styles.fill);

        const r = color.red();
        const g = color.green();
        const b = color.blue();
        const a = color.alpha();

        gl.uniform4f(uColor, r, g, b, a);
      }

      gl.drawArrays(gl.TRIANGLES, 0, 6);
    },
  });

  // useRenderAfterChildren((renderingContext) => {
  //   if (getHasCtxGl(renderingContext)) {
  //     const { ctxGl: gl } = renderingContext;

  //     unreactive.program =
  //       unreactive.program ?? renderingContext.ctxGl.createProgram();

  //     const { program } = unreactive;

  //     const styles = resolveStyles(props.style);

  //     // fill and stroke?
  //   }
  // });

  return props.children;
};

Rectangle.displayName = 'Rectangle';
