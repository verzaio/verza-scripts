import {formatUrl} from '@app/utils/misc';
import {uuid} from '@verza/sdk';
import {Box, Gltf, Group, Sphere} from '@verza/sdk/react';
import Description from '../components/Description';
import Label from '../components/Label';
import SceneTitle from '../components/SceneTitle';
import {SHOWCASE_LOCATION, SHOWCASE_SIZE} from '../Showcase';

const ObjectsExample = () => {
  const loc = SHOWCASE_LOCATION.clone();
  loc.translateZ(SHOWCASE_SIZE.y / 2 - 0.15);
  loc.translateX(-12);
  loc.rotateY(Math.PI);

  return (
    <Group key={uuid()} position={loc.position} rotation={loc.quaternion}>
      <SceneTitle position={[2, 3.3, 0]}>Objects</SceneTitle>

      <Description position={[2, 2.5, 0]}>
        Primitives & GLTF Support
      </Description>

      <Scene />
    </Group>
  );
};

const Scene = () => {
  return (
    <>
      <Group position={[-4, 1.2 / 2, 4]}>
        <Label position={[0, 1, 0]}>Box</Label>

        <Box color="#fc34a6" width={1.2} height={1.2} depth={1.2} />
      </Group>

      <Group position={[0, 0.7, 4]}>
        <Label position={[0, 1, 0]}>Sphere</Label>

        <Sphere color="#7812ff" radius={0.7} />
      </Group>

      <Group position={[4, 0.9, 4]}>
        <Label position={[0, 1, 0]}>Animated GLTF</Label>

        <Gltf
          scale={[0.02, 0.02, 0.02]}
          rotation={[0, -Math.PI / 2, 0]}
          url={formatUrl('showcase/models/ak47_reload_animation.glb')}
        />
      </Group>

      <Group position={[9, 0.9, 4]}>
        <Label position={[0, 1.5, 0]}>GLTF</Label>

        <Gltf
          url={formatUrl(
            'showcase/models/2001_crown_victoria_taxi_game_prop.glb',
          )}
        />
      </Group>
    </>
  );
};

export default ObjectsExample;
