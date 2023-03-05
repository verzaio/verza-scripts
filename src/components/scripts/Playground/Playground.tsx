import Provider from '@app/components/core/Provider';
import {Vector3} from '@verza/sdk';
import {Box, Line, Sphere, useRaycaster} from '@verza/sdk/react';
import {useEffect} from 'react';

const FROM_POINT = new Vector3(0, 1, 2);
const TO_POINT = new Vector3(0, 1, 6);

const Playground = () => {
  return (
    <Provider>
      <PlaygroundRender />
    </Provider>
  );
};

const PlaygroundRender = () => {
  const raycaster = useRaycaster();

  useEffect(() => {
    const intervalId = setInterval(async () => {
      /*  const intersects = await raycaster.raycastPoints(FROM_POINT, TO_POINT, {
        //entityTypes: ['object'],
        //excludePlayers: [1],
      });

      if (intersects.player || intersects.object) {
        console.log('playground line', intersects);
      } */
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [raycaster]);

  /* const objectRef = useRef<ObjectManager<'text'>>(null!);

  useEffect(() => {
    const object = objectRef.current;
    const intervalId = setInterval(() => {
      if (object.props.text.includes('Welcome')) {
        object.setProps({
          text: 'Verza!',
          color: '#6D2BA1',
          strokeColor: '#746A98',
        });
      } else {
        object.setProps({
          text: 'Welcome to',
          color: '#432BA1',
          strokeColor: '#746A98',
        });
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []); */

  return (
    <>
      <Line id="test" points={[FROM_POINT.toArray(), TO_POINT.toArray()]} />

      <Box color="red" width={2} height={2} depth={1} position={[-2, 2, 6]} />

      <Box color="blue" width={2} height={2} depth={1} position={[-2, 4, 6]} />

      <Box
        scale={[2, 2, 2]}
        color="orange"
        width={1}
        height={1}
        depth={1}
        position={[5, 2, 6]}
      />

      {/* <Text
        ref={objectRef}
        fontSize={1}
        strokeWidth={0.01}
        strokeColor="red"
        position={[-5, 2, -3]}
        color="blue">
        Welcome to!
      </Text> */}

      <Sphere
        id="sphere"
        color="cyan"
        radius={1}
        position={[2, 2, -10]}
        collision="dynamic"
      />
    </>
  );
};

export default Playground;
