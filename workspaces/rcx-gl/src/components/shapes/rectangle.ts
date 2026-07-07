import type {
  RCXComponent,
  RCXPropsWithChildren,
  RCXShapeStyle,
  RCXStyleProp,
} from '@blinkorb/rcx';
import {
  useRenderAfterChildren,
  useRenderBeforeChildren,
} from '@blinkorb/rcx/hooks';
import { resolveStyles } from '@blinkorb/rcx/utils';

import { getHasCtxGl } from '../../utils/get-has-ctx-gl.js';

export type RectangleProps = RCXPropsWithChildren<{
  x: number;
  y: number;
  width: number;
  height: number;
  beginPath?: boolean;
  style?: RCXStyleProp<RCXShapeStyle>;
}>;

export const Rectangle: RCXComponent<RectangleProps> = (props) => {
  useRenderBeforeChildren((renderingContext) => {
    if (getHasCtxGl(renderingContext)) {
      const { x, y, width, height, beginPath = true } = props;

      // plot rectangle?
    }
  });

  useRenderAfterChildren((renderingContext) => {
    if (getHasCtxGl(renderingContext)) {
      const styles = resolveStyles(props.style);

      // fill and stroke?
    }
  });

  return props.children;
};

Rectangle.displayName = 'Rectangle';
