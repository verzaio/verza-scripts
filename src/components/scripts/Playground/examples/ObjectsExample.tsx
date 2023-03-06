import {uuid} from '@verza/sdk';
import {Box, Group, Sphere} from '@verza/sdk/react';
import SceneTitle from '../components/SceneTitle';
import {SHOWCASE_LOCATION, SHOWCASE_SIZE} from '../Playground';

const ObjectsExample = () => {
  const loc = SHOWCASE_LOCATION.clone();
  loc.translateZ(-SHOWCASE_SIZE.x / 2 - 0.15);
  loc.rotateY(Math.PI);

  return (
    <Group key={uuid()} position={loc.position} rotation={loc.quaternion}>
      <SceneTitle position={[0, 3.5, 0]}>Objects</SceneTitle>

      <Scene />
    </Group>
  );
};

const Scene = () => {
  return (
    <>
      <Box color="red" position={[-2, 2, 6]} />

      <Sphere
        id="sphere"
        color="cyan"
        radius={0.5}
        position={[0, 2.5, 2]}
        collision="dynamic"
      />
    </>
  );
};

export default ObjectsExample;
