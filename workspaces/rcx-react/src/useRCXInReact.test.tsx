import '@testing-library/jest-dom';

import { type RCXComponent } from '@blinkorb/rcx';
import { jsx } from '@blinkorb/rcx/jsx-runtime';
import { render, screen } from '@testing-library/react';
import { act, useState } from 'react';

import { useRCXInReact } from './useRCXInReact.ts';

describe('useRCXInReact', () => {
  it('provides a way to share state between a React app and an RCX app', async () => {
    const TestRCXComponent: RCXComponent<{ count: number }> = ({ count }) =>
      count;

    const rerenderSpy = jest.fn((props) => jsx(TestRCXComponent, props));

    const TestReactComponent = () => {
      const [count, setCount] = useState(0);

      const setCanvas = useRCXInReact(() => rerenderSpy({ count }), [count]);
      return (
        <>
          <canvas ref={setCanvas} />
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
