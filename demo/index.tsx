import {
  ArcTo,
  Canvas,
  Circle,
  CXComponent,
  Ellipse,
  Line,
  Path,
  Point,
  Rectangle,
  render,
  Rotate,
  Scale,
  Text,
  Translate,
  useCanvasContext,
  useLoop,
  useOnMount,
  useReactive,
  useWindowSize,
} from '@blinkorb/rcx';

const RendersChildren: CXComponent = ({ children }) => children;

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
      <Ellipse
        x={canvasContext.props.width * 0.5}
        y={canvasContext.props.height * 0.5}
        radiusX={canvasContext.props.width * 0.2}
        radiusY={canvasContext.props.width * 0.1}
        fill="black"
        rotation={((Date.now() % 5000) / 5000) * Math.PI * 2}
      />
      <Circle
        x={canvasContext.props.width * 0.5}
        y={canvasContext.props.height * 0.5}
        radius={canvasContext.props.width * 0.05}
        endAngle={
          Math.PI +
          Math.cos(((Date.now() % 5000) / 5000) * Math.PI * 2) * Math.PI
        }
        fill="white"
      >
        <Point
          x={canvasContext.props.width * 0.5}
          y={canvasContext.props.height * 0.5}
        />
      </Circle>
      <Line
        startX={10}
        startY={10}
        endX={20}
        endY={20}
        stroke="green"
        strokeWidth={5}
      >
        <Point x={30} y={10} />
      </Line>
      <Path
        points={[
          [0, 20],
          [5, 50],
          [10, 0],
          [15, 20],
          [20, 5],
        ]}
        stroke="black"
      />
      <Path stroke="black" closePath>
        <Point x={0} y={50} />
        <Point x={5} y={55} />
        <Point x={10} y={50} />
        <Point x={15} y={55} />
        <Point x={20} y={50} />
        <Point x={20} y={75} />
        <Point x={0} y={75} />
      </Path>
      <Path strokeWidth={5} stroke="blue">
        <Point x={200} y={200} />
        <ArcTo
          startControlX={200}
          startControlY={100}
          endControlX={300}
          endControlY={100}
          radius={50}
        />
        <Point x={300} y={100} />
      </Path>
      <Text x={305} y={102} fill="red" stroke="black">
        The offset is {reactive.offset.toFixed(2)} {[1, 2, 3].map((n) => n)}{' '}
        <RendersChildren>Children</RendersChildren>
      </Text>
      <Translate x={100} y={100}>
        <Rotate rotation={Math.PI * 0.25}>
          <Scale scale={0.5}>
            <Rectangle x={0} y={0} width={100} height={50} fill="cyan" />
          </Scale>
        </Rotate>
      </Translate>
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
