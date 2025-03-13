import type {
  CXComponent,
  PropsWithChildren,
  ShapeStyle,
  StyleProp,
} from '../../types.ts';
import { Ellipse } from './ellipse.ts';

export type CircleProps = PropsWithChildren<{
  x: number;
  y: number;
  radius: number;
  rotation?: number;
  startAngle?: number;
  endAngle?: number;
  counterClockwise?: boolean;
  beginPath?: boolean;
  closePath?: boolean;
  style?: StyleProp<ShapeStyle>;
}>;

export const Circle: CXComponent<CircleProps> = (props) => {
  const { radius, ...rest } = props;

  return (
    <Ellipse {...rest} radiusX={radius} radiusY={radius}>
      {props.children}
    </Ellipse>
  );
};

Circle.displayName = 'Circle';
