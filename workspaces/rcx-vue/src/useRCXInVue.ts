import {
  type AnyObject,
  type CreateRootSuccess,
  type RCXComponent,
  type RCXElement,
} from '@blinkorb/rcx';
import { createRoot } from '@blinkorb/rcx/root';

export const useRCXInVue = <C extends RCXComponent<P>, P extends AnyObject>(
  callback: () => RCXElement<C, P>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dependencies: readonly any[]
) => {
  // @FIXME: add implementation
};
