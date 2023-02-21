import Provider from '@app/components/core/Provider';
import {Vector3} from '@verza/sdk';
import {Box, Line, useRaycaster} from '@verza/sdk/react';
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

  return (
    <>
      <Line id="test" points={[FROM_POINT.toArray(), TO_POINT.toArray()]} />

      <Box
        id="yellowBox"
        box={{
          w: 2,
          h: 2,
          d: 1,
          c: 'yellow',
        }}
        position={[-2, 2, 2]}
      />
    </>
  );
};

export default Playground;
