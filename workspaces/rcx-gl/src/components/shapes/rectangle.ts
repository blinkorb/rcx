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
  uniform float uStrokeWidth;

  varying vec2 vCenterOffset;

  void main() {
    // Grow the drawn quad by half the stroke width on every side so the outer
    // half of a centered stroke isn't clipped.
    vec2 effOffset = uOffset - uStrokeWidth * 0.5;
    vec2 effSize = uSize + uStrokeWidth;

    // Position of this fragment relative to the rect center, in CSS pixels.
    // aVertex.x is in [0, 1], aVertex.y is in [-1, 0].
    vCenterOffset = vec2(
      (aVertex.x - 0.5) * effSize.x,
      (aVertex.y + 0.5) * effSize.y
    );

    gl_Position = vec4(
      ((aVertex.x*effSize.x + effOffset.x)/uCanvasSize.x) * uPixelRatio - 1.0,
      ((aVertex.y*effSize.y - effOffset.y)/uCanvasSize.y) * uPixelRatio + 1.0,
      0.0,
      1.0
    );
  }
`;

const fragmentShaderSourceSolid = `
  // highp must match the vertex shader's default float precision, otherwise the
  // shared uSize/uStrokeWidth/uPixelRatio uniforms fail to link.
  precision highp float;
  uniform vec4 uColor;
  uniform vec4 uStrokeColor;
  uniform vec2 uSize;
  uniform float uStrokeWidth;
  uniform float uPixelRatio;

  varying vec2 vCenterOffset;

  void main() {
    // Signed distance to the rectangle boundary, in CSS pixels (< 0 inside).
    vec2 d = abs(vCenterOffset) - uSize * 0.5;
    float dist = length(max(d, 0.0)) + min(max(d.x, d.y), 0.0);

    float distPx = dist * uPixelRatio;
    float halfStrokePx = uStrokeWidth * uPixelRatio * 0.5;

    // Linear box-filter coverage: a 1px-wide ramp that is exactly 0.5 at the
    // boundary, so a 1px stroke straddling the edge reads as 50% each side.
    float coverageOuter = clamp(0.5 - (distPx - halfStrokePx), 0.0, 1.0);
    float coverageInner = clamp(0.5 - (distPx + halfStrokePx), 0.0, 1.0);
    float coverageStroke = coverageOuter - coverageInner;

    // Premultiplied composite of two disjoint sub-areas (fill under, stroke over).
    float fillA = uColor.a * coverageInner;
    float strokeA = uStrokeColor.a * coverageStroke;
    gl_FragColor = vec4(
      uColor.rgb * fillA + uStrokeColor.rgb * strokeA,
      fillA + strokeA
    );
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
      const uPixelRatio = gl.getUniformLocation(program, 'uPixelRatio');
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
        uPixelRatio,
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
        uPixelRatio,
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
      gl.uniform1f(uPixelRatio, canvasContext.pixelRatio);

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
