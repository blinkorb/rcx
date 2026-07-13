import '@testing-library/jest-dom';

import { type RCXComponent } from '@blinkorb/rcx';
import { jsx } from '@blinkorb/rcx/jsx-runtime';
import { render, screen } from '@testing-library/react';
import { act, useCallback, useState } from 'react';

import { useRCXInReact } from './useRCXInReact.js';

describe('useRCXInReact', () => {
  it('provides a way to share state between a React app and an RCX app', async () => {
    const TestRCXComponent: RCXComponent<{ count: number }> = ({ count }) =>
      count;

    const rerenderSpy = jest.fn((props) => jsx(TestRCXComponent, props));

    const TestReactComponent = () => {
      const [count, setCount] = useState(0);

      const setCreateRootOptions = useRCXInReact(
        () => rerenderSpy({ count }),
        [count]
      );

      const onCanvasChange = useCallback(
        (element: HTMLCanvasElement | null) => {
          if (!element) {
            setCreateRootOptions(null);
            return;
          }

          const ctx2d = element.getContext('2d');

          if (ctx2d) {
            setCreateRootOptions({ ctx2d });
          } else {
            // Display an error to the user
            setCreateRootOptions(null);
          }
        },
        [setCreateRootOptions]
      );

      return (
        <>
          <canvas ref={onCanvasChange} />
          <p>Count: {count}</p>
          <button onClick={() => setCount((prev) => prev + 1)}>
            Increment
          </button>
        </>
      );
    };

    render(<TestReactComponent />);

    expect(await screen.findByRole('paragraph')).toHaveTextContent('Count: 0');
    expect(rerenderSpy).toHaveBeenCalledWith({
      count: 0,
    });

    const increment = await screen.findByRole('button');

    act(() => increment.click());

    expect(await screen.findByRole('paragraph')).toHaveTextContent('Count: 1');
    expect(rerenderSpy).toHaveBeenCalledWith({
      count: 1,
    });
  });
});
