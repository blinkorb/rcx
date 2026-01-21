import {
  ArcTo,
  Canvas,
  Circle,
  Clip,
  Ellipse,
  Line,
  Path,
  Point,
  RCXComponent,
  Rectangle,
  render,
  Rotate,
  Scale,
  Text,
  TextMultiline,
  Translate,
  useCanvasContext,
  useLinearGradient,
  useLoop,
  useOnMount,
  useRadialGradient,
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

const TextAligns = () => (
  <>
    <Line
      startX={100}
      endX={100}
      startY={190}
      endY={290}
      style={{ stroke: '#d5d5d5' }}
    />
    <Text x={100} y={200} style={{ fill: 'black' }}>
      Left (default)
    </Text>
    <Text x={100} y={220} style={{ fill: 'black', align: 'right' }}>
      Right
    </Text>
    <Text x={100} y={240} style={{ fill: 'black', align: 'center' }}>
      Center
    </Text>
    <Text x={100} y={260} style={{ fill: 'black', align: 'start' }}>
      Start
    </Text>
    <Text x={100} y={280} style={{ fill: 'black', align: 'end' }}>
      End
    </Text>

    <Line
      startX={50}
      endX={150}
      startY={300}
      endY={300}
      style={{ stroke: '#d5d5d5' }}
    />
    <Text x={100} y={300} style={{ fill: 'black', baseline: 'alphabetic' }}>
      Alphabetic (default)
    </Text>
    <Line
      startX={50}
      endX={150}
      startY={320}
      endY={320}
      style={{ stroke: '#d5d5d5' }}
    />
    <Text x={100} y={320} style={{ fill: 'black', baseline: 'bottom' }}>
      Bottom
    </Text>
    <Line
      startX={50}
      endX={150}
      startY={340}
      endY={340}
      style={{ stroke: '#d5d5d5' }}
    />
    <Text x={100} y={340} style={{ fill: 'black', baseline: 'hanging' }}>
      Hanging
    </Text>
    <Line
      startX={50}
      endX={150}
      startY={360}
      endY={360}
      style={{ stroke: '#d5d5d5' }}
    />
    <Text x={100} y={360} style={{ fill: 'black', baseline: 'ideographic' }}>
      Ideographic
    </Text>
    <Line
      startX={50}
      endX={150}
      startY={380}
      endY={380}
      style={{ stroke: '#d5d5d5' }}
    />
    <Text x={100} y={380} style={{ fill: 'black', baseline: 'middle' }}>
      Middle
    </Text>
    <Line
      startX={50}
      endX={150}
      startY={400}
      endY={400}
      style={{ stroke: '#d5d5d5' }}
    />
    <Text x={100} y={400} style={{ fill: 'black', baseline: 'top' }}>
      Top
    </Text>
    <Text
      x={10}
      y={450}
      style={{
        fill: 'black',
        fontSize: 20,
        fontFamily: 'serif',
        fontWeight: 'bold',
        fontStyle: 'italic',
        fontVariant: 'small-caps',
      }}
    >
      Styled font
    </Text>
  </>
);

const Gradients: RCXComponent = () => {
  const stroke = useLinearGradient({
    startX: 10,
    startY: 480,
    endX: 10 + 50,
    endY: 480 + 50,
    stops: [
      {
        offset: 0,
        color: '#f00',
      },
      {
        offset: 1,
        color: '#000',
      },
    ],
  });

  const fill = useRadialGradient({
    startX: 10 + 25,
    startY: 480 + 25,
    startRadius: 0,
    endX: 10 + 25,
    endY: 480 + 25,
    endRadius: 25,
    stops: [
      {
        offset: 0,
        color: '#000',
      },
      {
        offset: 1,
        color: 'cyan',
      },
    ],
  });

  return (
    <Rectangle
      x={10}
      y={480}
      width={50}
      height={50}
      style={{ fill, stroke, strokeWidth: 5, strokeCap: 'round' }}
    />
  );
};

const MULTILINE_TEXT =
  'Lorem ipsum dolor sit amet,      consectetur adipiscing elit.\r\n    Aliquam quis\tpulvinar metus.\r\n\r\nVivamus tempor tellus venenatis dapibus convallis.\rCurabitur tortor nunc, egestas vitae viverra ac, aliquet ut est.\r\rNullam in vehicula ante. Fusce nec rhoncus lorem.\n\nNulla in egestas nisl.\nMorbi tempor massa quis rutrum pulvinar.';

const MultilineTexts = () => (
  <>
    <TextMultiline x={400} y={10} style={{ fill: 'black' }}>
      width: undefined, whiteSpace: collapse (default){'\n'}
      {MULTILINE_TEXT}
    </TextMultiline>
    <TextMultiline
      x={400}
      y={140}
      style={{ fill: 'black', whiteSpace: 'preserve' }}
    >
      width: undefined, whiteSpace: preserve{'\n'}
      {MULTILINE_TEXT}
    </TextMultiline>
    <TextMultiline x={700} y={10} width={50} style={{ fill: 'black' }}>
      width{'\n'}
      {MULTILINE_TEXT}
    </TextMultiline>
    <TextMultiline
      x={750}
      y={10}
      width={50}
      style={{ fill: 'black', wordBreak: 'break-all' }}
    >
      break-all{'\n'}
      {MULTILINE_TEXT}
    </TextMultiline>
    <TextMultiline
      x={800}
      y={10}
      width={50}
      style={{ fill: 'black', wordBreak: 'break-word' }}
    >
      beak-word{'\n'}
      {MULTILINE_TEXT}
    </TextMultiline>
    <TextMultiline
      x={850}
      y={10}
      width={50}
      style={{ fill: 'black', wordBreak: 'break-word', hyphens: 'auto' }}
    >
      break-word hyphens{'\n'}
      {MULTILINE_TEXT}
    </TextMultiline>
  </>
);

const Page: RCXComponent = () => {
  const canvasContext = useCanvasContext();
  const getOffset = () => Math.cos(Date.now() * 0.001) * 10;
  const reactive = useReactive({ isMounted: true, offset: getOffset() });

  useLoop(() => {
    // reactive.offset = getOffset();
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
        style={{ stroke: 'green', strokeWidth: 5, strokeJoin: 'bevel' }}
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
      <Path style={{ stroke: 'blue', strokeWidth: 5, strokeCap: 'round' }}>
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
      <Rectangle x={0} y={100} width={50} height={50}>
        <Clip>
          <Circle x={25} y={125} radius={30} style={{ fill: '#d5d5d5' }} />
          <Text x={10} y={125} style={{ fill: 'red' }}>
            This text is clipped by a rectangle
          </Text>
        </Clip>
      </Rectangle>

      <TextAligns />
      <Gradients />
      <MultilineTexts />
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
