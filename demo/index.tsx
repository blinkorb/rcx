import {
  ArcTo,
  Canvas,
  Circle,
  RCXComponent,
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
} from '@blinkorb/rcx';

const RendersChildren: RCXComponent = ({ children }) => children;

const Unmounts: RCXComponent = () => {
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

  return (
    <Rectangle x={0} y={0} width={10} height={10} style={{ fill: 'black' }} />
  );
};

const Page: RCXComponent = () => {
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
        x={canvasContext.width * 0.25}
        y={canvasContext.height * 0.25 + reactive.offset}
        width={canvasContext.width * 0.5}
        height={canvasContext.height * 0.5}
        style={{ fill: 'red' }}
      />
      <Ellipse
        x={canvasContext.width * 0.5}
        y={canvasContext.height * 0.5}
        radiusX={canvasContext.width * 0.2}
        radiusY={canvasContext.width * 0.1}
        style={{ fill: 'black' }}
        rotation={((Date.now() % 5000) / 5000) * Math.PI * 2}
      />
      <Circle
        x={canvasContext.width * 0.5}
        y={canvasContext.height * 0.5}
        radius={canvasContext.width * 0.05}
        endAngle={
          Math.PI +
          Math.cos(((Date.now() % 5000) / 5000) * Math.PI * 2) * Math.PI
        }
        style={{ fill: 'white' }}
      >
        <Point x={canvasContext.width * 0.5} y={canvasContext.height * 0.5} />
      </Circle>
      <Line
        startX={10}
        startY={10}
        endX={20}
        endY={20}
        style={{ stroke: 'green', strokeWidth: 5 }}
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
        style={{ stroke: 'black' }}
      />
      <Path style={{ stroke: 'black' }} closePath>
        <Point x={0} y={50} />
        <Point x={5} y={55} />
        <Point x={10} y={50} />
        <Point x={15} y={55} />
        <Point x={20} y={50} />
        <Point x={20} y={75} />
        <Point x={0} y={75} />
      </Path>
      <Path style={{ stroke: 'blue', strokeWidth: 5 }}>
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
      <Text x={305} y={102} style={{ fill: 'red', stroke: 'black' }}>
        The offset is {reactive.offset.toFixed(2)} {[1, 2, 3].map((n) => n)}{' '}
        <RendersChildren>Children</RendersChildren>
      </Text>
      <Translate x={100} y={100}>
        <Rotate rotation={Math.PI * 0.25}>
          <Scale scale={0.5}>
            <Rectangle
              x={0}
              y={0}
              width={100}
              height={50}
              style={{ fill: 'cyan' }}
            />
          </Scale>
        </Rotate>
      </Translate>
      {reactive.isMounted && <Unmounts />}
    </>
  );
};

Page.displayName = 'Page';

const App = () => {
  return (
    <Canvas>
      <Page />
    </Canvas>
  );
};

render(<App />, document.body);
