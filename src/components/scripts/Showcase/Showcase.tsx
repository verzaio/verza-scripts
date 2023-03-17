import {Box, Group, useCommand} from '@verza/sdk/react';
import {Object3D, ObjectTexture, RepeatWrapping, Vector2} from '@verza/sdk';

import Provider from '@app/components/core/Provider';
import {formatUrl} from '@app/utils/misc';

import PhysicsExample from './examples/PhysicsExample';
import RaycasterExample from './examples/RaycasterExample';
import ObjectsExample from './examples/ObjectsExample';
import MaterialsExample from './examples/MaterialsExample';
import EventsExample from './examples/EventsExample';
import CameraExample from './examples/CameraExample';
import SkyExample from './examples/SkyExample';
import MoonPhaseExample from './examples/MoonPhaseExample';

export const SHOWCASE_LOCATION = new Object3D();

SHOWCASE_LOCATION.position.set(30, 60, 30);

export const SHOWCASE_SIZE = new Vector2(100, 40);

const WALL_HEIGHT = 5;

const WALL_WIDTH = 0.2;

const Showcase = () => {
  return (
    <Provider>
      <ShowcaseRender />
    </Provider>
  );
};

const ShowcaseRender = () => {
  useCommand('show').on(player => {
    player.setPosition(SHOWCASE_LOCATION.position);
  });

  return (
    <>
      <Scene />

      <CameraExample />

      <EventsExample />

      <PhysicsExample />

      <RaycasterExample />

      <ObjectsExample />

      <MaterialsExample />

      <SkyExample />
      <MoonPhaseExample />
    </>
  );
};

const Scene = () => {
  const Wall = (
    width: number,
    position: [number, number, number],
    rotation: [number, number, number],
  ) => {
    const map = (name: string): ObjectTexture => {
      return {
        source: formatUrl(`showcase/textures/wall/${name}`),
        repeat: [SHOWCASE_SIZE.x, WALL_HEIGHT],
        wrapS: RepeatWrapping,
        wrapT: RepeatWrapping,
      };
    };

    return (
      <Box
        width={width}
        height={WALL_HEIGHT}
        depth={0.2}
        position={position}
        rotation={rotation}
        material={{
          map: map('concrete_53_basecolor-1K.png'),
          roughnessMap: map('concrete_53_roughness-1K.png'),
        }}
        userData={{uneditable: true}}
      />
    );
  };

  return (
    <Group position={SHOWCASE_LOCATION.position} userData={{uneditable: true}}>
      {/* floor */}
      <Box
        width={SHOWCASE_SIZE.x}
        height={WALL_WIDTH}
        depth={SHOWCASE_SIZE.y}
        position={[0, -(WALL_WIDTH / 2), 0]}
        material={{
          map: {
            source: formatUrl(
              'showcase/textures/floor/floor_tiles_02_diff_4k.jpg',
            ),
            repeat: [SHOWCASE_SIZE.x, SHOWCASE_SIZE.y],
            wrapS: RepeatWrapping,
            wrapT: RepeatWrapping,
          },
          roughnessMap: {
            source: formatUrl(
              'showcase/textures/floor/floor_tiles_02_rough_4k.jpg',
            ),
            repeat: [SHOWCASE_SIZE.x, SHOWCASE_SIZE.y],
            wrapS: RepeatWrapping,
            wrapT: RepeatWrapping,
          },
        }}
      />

      {/* walls */}
      {Wall(
        SHOWCASE_SIZE.x,
        [0, WALL_HEIGHT / 2, SHOWCASE_SIZE.y / 2],
        [0, 0, 0],
      )}

      {Wall(
        SHOWCASE_SIZE.y,
        [SHOWCASE_SIZE.x / 2, WALL_HEIGHT / 2, 0],
        [0, Math.PI / 2, 0],
      )}

      {Wall(
        SHOWCASE_SIZE.x,
        [0, WALL_HEIGHT / 2, -SHOWCASE_SIZE.y / 2],
        [0, 0, 0],
      )}

      {Wall(
        SHOWCASE_SIZE.y,
        [-SHOWCASE_SIZE.x / 2, WALL_HEIGHT / 2, 0],
        [0, Math.PI / 2, 0],
      )}
    </Group>
  );
};

export default Showcase;
