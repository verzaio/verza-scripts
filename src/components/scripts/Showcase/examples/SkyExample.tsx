import {uuid} from '@verza/sdk';
import {Box, Group, useWorld} from '@verza/sdk/react';
import Description from '../components/Description';
import Label from '../components/Label';
import SceneTitle from '../components/SceneTitle';
import {BOX_RADIUS} from '../constants';
import {SHOWCASE_LOCATION, SHOWCASE_SIZE} from '../Showcase';

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
  const {sky} = useWorld();
  return (
    <>
      <Group
        position={[-3, 1, 0.5]}
        onPointerDown={() => {
          sky.setTimeRepresentation(7);
        }}
        userData={{
          uneditable: true,
        }}>
        <Label position={[0, 0, 0.15]}>Sunrise</Label>
        <Box
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
          sky.setTimeRepresentation(13);
        }}
        userData={{
          uneditable: true,
        }}>
        <Label position={[0, 0, 0.15]}>Midday</Label>
        <Box
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
          sky.setTimeRepresentation(19);
        }}
        userData={{
          uneditable: true,
        }}>
        <Label position={[0, 0, 0.15]}>Sunset</Label>
        <Box
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
          sky.setTimeRepresentation(5);
        }}
        userData={{
          uneditable: true,
        }}>
        <Label position={[0, 0, 0.15]}>Night</Label>
        <Box
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
    </>
  );
};

export default SkyExample;
