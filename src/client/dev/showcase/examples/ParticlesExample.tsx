import {Group} from '@verza/sdk/react';
import {uuid} from '@verza/sdk/utils';

import SceneTitle from '../components/SceneTitle';
import {SHOWCASE_LOCATION, SHOWCASE_SIZE} from '../constants';

const ParticlesExample = () => {
  const loc = SHOWCASE_LOCATION.clone();
  loc.translateX(15);
  loc.translateZ(-SHOWCASE_SIZE.y / 2 + 0.15);
  loc.translateY(0.5);

  return (
    <Group key={uuid()} position={loc.position} rotation={loc.quaternion}>
      <SceneTitle position={[0, 3.3, 0]}>Particles</SceneTitle>

      <Scene />
    </Group>
  );
};

const Scene = () => {
  return (
    <>
      <Group
        position={[0.0, 1.5, 2.0]}
        userData={{
          uneditable: true,
        }}>
        <Group
          particles={{
            color: '#a80e0e',
            size: [0.1, 0.5],
            amount: 300,
            shape: 'sphere',
            direction: 'out',
            distance: 1.5,
          }}
        />

        <Group
          position={[-3.0, 0.0, 0.0]}
          particles={{
            color: '#188ce6',
            size: [0.1, 0.5],
            amount: 300,
            radius: 0,
            zoom: [0, 1],
            direction: [-1, 0, 0],
            distance: 2,
          }}
        />

        <Group
          position={[4.0, 1.5, 0.0]}
          particles={{
            color: [
              {
                time: 0.5,
                value: '#fdfdfd',
              },
              {
                time: 1.0,
                value: '#a6a6a6',
              },
            ],
            opacity: 0.1,
            transparency: 0.1,
            size: [0.1, 0.3],
            amount: 300,
            radius: 2,
            lifetime: 2,
            zoom: [0, 1],
            direction: [0, -1, 0],
            distance: 3,
          }}
        />

        <Group
          position={[-9.0, 0, 0.0]}
          rotation={[Math.PI / 2, 0, Math.PI / 2]}
          particles={{
            color: [
              {
                time: 0.3,
                value: '#e13b9f',
              },
              {
                time: 1.0,
                value: '#d6e926',
              },
              {
                time: 1.0,
                value: '#a02cee',
              },
              {
                time: 1.0,
                value: '#2cb1ee',
              },
            ],
            opacity: 0.1,
            transparency: 0.1,
            size: [0.3, 0.5],
            amount: 1000,
            radius: 1.5,
            lifetime: 2,
            shape: 'sphere',
            theta: -Math.PI,
            direction: [0, 0, -1],
            zoom: [0, 1],
            distance: 0.5,
          }}
        />
      </Group>
    </>
  );
};

export default ParticlesExample;
