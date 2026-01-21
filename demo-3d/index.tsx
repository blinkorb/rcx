import { Canvas, render } from '@blinkorb/rcx';

const App = () => {
  return <Canvas></Canvas>;
};

render(<App />, document.body, { enableContextWebGL2: true });
