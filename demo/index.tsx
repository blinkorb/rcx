import {
  Canvas,
  CXComponent,
  Rectangle,
  render,
  useCanvasContext,
  useLoop,
  useOnMount,
  useReactive,
  useWindowSize,
} from '@blinkorb/rcx';

const Unmounts: CXComponent = () => {
  // eslint-disable-next-line no-console
  console.log('rendered');

  useOnMount(() => {
    // eslint-disable-next-line no-console
    console.log('mounted');

    return () => {
      // eslint-disable-next-line no-console
      console.log('unmounted');
    };
  });

  return <Rectangle x={0} y={0} width={10} height={10} fill="black" />;
};

const Page: CXComponent = () => {
  const canvasContext = useCanvasContext();
  const getOffset = () => Math.cos(Date.now() * 0.001) * 10;
  const reactive = useReactive({ isMounted: true, offset: getOffset() });

  useLoop(() => {
    reactive.offset = getOffset();
  });

  useOnMount(() => {
    window.setTimeout(() => {
      reactive.isMounted = false;
    }, 1000);
  });

  return (
    <>
      <Rectangle
        x={canvasContext.props.width * 0.25}
        y={canvasContext.props.height * 0.25 + reactive.offset}
        width={canvasContext.props.width * 0.5}
        height={canvasContext.props.height * 0.5}
        fill="red"
      />
      {reactive.isMounted && <Unmounts />}
    </>
  );
};

Page.displayName = 'Page';

const App = () => {
  const windowSize = useWindowSize();

  return (
    <Canvas width={windowSize.width} height={windowSize.height}>
      <Page />
    </Canvas>
  );
};

render(<App />, document.body);
