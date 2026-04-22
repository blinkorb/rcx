/** @jsxImportSource @blinkorb/rcx */
import type {
  RCXComponent,
  RCXPropsWithChildren,
  RCXShapeStyle,
  RCXStyleProp,
} from '../../types.js';
import { Ellipse } from './ellipse.js';

export type CircleProps = RCXPropsWithChildren<{
  x: number;
  y: number;
  radius: number;
  rotation?: number;
  startAngle?: number;
  endAngle?: number;
  counterClockwise?: boolean;
  beginPath?: boolean;
  closePath?: boolean;
  style?: RCXStyleProp<RCXShapeStyle>;
}>;

export const Circle: RCXComponent<CircleProps> = (props) => {
  const { radius, ...rest } = props;

  return (
    <Ellipse {...rest} radiusX={radius} radiusY={radius}>
      {props.children}
    </Ellipse>
  );
};

Circle.displayName = 'Circle';
