import {Box, Group, useCommand} from '@verza/sdk/react';
import {Object3D, ObjectTexture, RepeatWrapping, Vector2} from '@verza/sdk';

import Provider from '@app/components/core/Provider';
import {formatUrl} from '@app/utils/misc';

import PhysicsExample from './examples/PhysicsExample';
import RaycasterExample from './examples/RaycasterExample';
import ObjectsExample from './examples/ObjectsExample';

export const SHOWCASE_LOCATION = new Object3D();

SHOWCASE_LOCATION.position.set(30, 60, 30);

export const SHOWCASE_SIZE = new Vector2(50, 50);

const WALL_HEIGHT = 5;

const Playground = () => {
  return (
    <Provider>
      <PlaygroundRender />
    </Provider>
  );
};

const PlaygroundRender = () => {
  useCommand('show').on(player => {
    player.setPosition(SHOWCASE_LOCATION.position);
  });

  return (
    <>
      <Scene />

      <ObjectsExample />

      <RaycasterExample />

      <PhysicsExample />
    </>
  );
};

const Scene = () => {
  const Wall = (
    position: [number, number, number],
    rotation: [number, number, number],
  ) => {
    const map = (name: string): ObjectTexture => {
      return {
        source: formatUrl(`/textures/wall/${name}`),
        repeat: [SHOWCASE_SIZE.x, WALL_HEIGHT],
        wrapS: RepeatWrapping,
        wrapT: RepeatWrapping,
      };
    };

    return (
      <Box
        width={SHOWCASE_SIZE.x}
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
    <Group position={SHOWCASE_LOCATION.position}>
      {/* floor */}
      <Box
        width={SHOWCASE_SIZE.x}
        height={0.2}
        depth={SHOWCASE_SIZE.y}
        material={{
          map: {
            source: formatUrl('/textures/floor_tiles_02_diff_4k.jpg'),
            repeat: [SHOWCASE_SIZE.x, SHOWCASE_SIZE.y],
            wrapS: RepeatWrapping,
            wrapT: RepeatWrapping,
          },
          roughnessMap: {
            source: formatUrl('/textures/floor_tiles_02_rough_4k.jpg'),
            repeat: [SHOWCASE_SIZE.x, SHOWCASE_SIZE.y],
            wrapS: RepeatWrapping,
            wrapT: RepeatWrapping,
          },
        }}
        userData={{uneditable: true}}
      />

      {/* walls */}
      {Wall([0, WALL_HEIGHT / 2, SHOWCASE_SIZE.x / 2], [0, 0, 0])}

      {Wall([SHOWCASE_SIZE.x / 2, WALL_HEIGHT / 2, 0], [0, Math.PI / 2, 0])}

      {Wall([0, WALL_HEIGHT / 2, -SHOWCASE_SIZE.x / 2], [0, 0, 0])}

      {Wall([-SHOWCASE_SIZE.x / 2, WALL_HEIGHT / 2, 0], [0, Math.PI / 2, 0])}
    </Group>
  );
};

export default Playground;
