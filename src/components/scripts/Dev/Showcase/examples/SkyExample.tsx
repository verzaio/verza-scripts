import Description from '../components/Description';
import Label from '../components/Label';
import SceneTitle from '../components/SceneTitle';
import {BOX_RADIUS} from '../constants';
import {SHOWCASE_LOCATION, SHOWCASE_SIZE} from '../Showcase';

import {formatUrl} from '@app/utils/misc';
import {Box, Group, useEngine} from '@verza/sdk/react';
import {uuid} from '@verza/sdk/utils';

const formatPath = (name: string) =>
  formatUrl(`showcase/textures/skybox/${name}`);

const SkyExample = () => {
  const loc = SHOWCASE_LOCATION.clone();
  loc.translateX(40);
  loc.translateZ(-SHOWCASE_SIZE.y / 2 + 0.15);
  loc.translateY(0.5);

  return (
    <Group key={uuid()} position={loc.position} rotation={loc.quaternion}>
      <SceneTitle position={[0, 3.3, 0]}>Sky</SceneTitle>

      <Description position={[0, 2.5, 0]}>Click to change time</Description>

      <Scene />
    </Group>
  );
};

const Scene = () => {
  const {world} = useEngine();

  return (
    <>
      <Group
        position={[-3, 1, 0.5]}
        onPointerDown={() => {
          world.setSkybox(null);
          world.setTimeRepresentation(7);
        }}
        userData={{
          uneditable: true,
        }}>
        <Label position={[0, 0, 0.15]}>Sunrise</Label>
        <Box
          collision="static"
          color="#ffa443"
          width={1.5}
          height={2}
          depth={0.2}
          radius={BOX_RADIUS}
          material={{
            roughness: 0,
          }}
        />
      </Group>
      <Group
        position={[-1, 1, 0.5]}
        onPointerDown={() => {
          world.setSkybox(null);
          world.setTimeRepresentation(13);
        }}
        userData={{
          uneditable: true,
        }}>
        <Label position={[0, 0, 0.15]}>Midday</Label>
        <Box
          collision="static"
          color="#5781ff"
          width={1.5}
          height={2}
          depth={0.2}
          radius={BOX_RADIUS}
          material={{
            roughness: 0,
          }}
        />
      </Group>
      <Group
        position={[1, 1, 0.5]}
        onPointerDown={() => {
          world.setSkybox(null);
          world.setTimeRepresentation(19);
        }}
        userData={{
          uneditable: true,
        }}>
        <Label position={[0, 0, 0.15]}>Sunset</Label>
        <Box
          collision="static"
          color="#fd5a36"
          width={1.5}
          height={2}
          depth={0.2}
          radius={BOX_RADIUS}
          material={{
            roughness: 0,
          }}
        />
      </Group>
      <Group
        position={[3, 1, 0.5]}
        onPointerDown={() => {
          world.setSkybox(null);
          world.setTimeRepresentation(5);
        }}
        userData={{
          uneditable: true,
        }}>
        <Label position={[0, 0, 0.15]}>Night</Label>
        <Box
          collision="static"
          color="#242424"
          width={1.5}
          height={2}
          depth={0.2}
          radius={BOX_RADIUS}
          material={{
            roughness: 0,
          }}
        />
      </Group>
      <Group
        position={[5, 1, 0.5]}
        onPointerDown={() => {
          world.setSkybox(formatPath('landscape.jpg'));

          /* world.setSkybox({
            right: formatPath('cubemap/right.png'),
            left: formatPath('cubemap/left.png'),
            top: formatPath('cubemap/top.png'),
            bottom: formatPath('cubemap/bottom.png'),
            front: formatPath('cubemap/front.png'),
            back: formatPath('cubemap/back.png'),
          }); */
        }}
        userData={{
          uneditable: true,
        }}>
        <Label position={[0, 0, 0.15]}>Skybox</Label>
        <Box
          collision="static"
          color="#ff38eb"
          width={1.5}
          height={2}
          depth={0.2}
          radius={BOX_RADIUS}
          material={{
            roughness: 0,
          }}
        />
      </Group>
    </>
  );
};

export default SkyExample;
