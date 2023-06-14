import Description from '../components/Description';
import Label from '../components/Label';
import SceneTitle from '../components/SceneTitle';
import {BOX_RADIUS} from '../constants';
import {SHOWCASE_LOCATION, SHOWCASE_SIZE} from '../Showcase';

import {Box, Group, useEngine} from '@verza/sdk/react';
import {uuid} from '@verza/sdk/utils';

const MoonPhaseExample = () => {
  const loc = SHOWCASE_LOCATION.clone();
  loc.translateX(30);
  loc.translateZ(-SHOWCASE_SIZE.y / 2 + 0.15);
  loc.translateY(0.5);

  return (
    <Group key={uuid()} position={loc.position} rotation={loc.quaternion}>
      <SceneTitle position={[0, 3.3, 0]}>Moon Phases</SceneTitle>

      <Description position={[0, 2.5, 0]}>
        Click to preview the moon phase
      </Description>

      <Scene />
    </Group>
  );
};

const Scene = () => {
  const {world} = useEngine();

  return (
    <>
      <Group
        position={[-3.5, 1.5, 0.5]}
        onPointerDown={() => {
          world.setTimeRepresentation(5);
          world.setMoonPhase('NEW_MOON');
        }}
        userData={{
          uneditable: true,
        }}>
        <Label position={[0, 0, 0.15]}>New Moon</Label>
        <Box
          collision="static"
          color="#f1f1f1"
          width={2}
          height={1}
          depth={0.2}
          radius={BOX_RADIUS}
          material={{
            roughness: 0,
          }}
        />
      </Group>
      <Group
        position={[-1.25, 1.5, 0.5]}
        onPointerDown={() => {
          world.setTimeRepresentation(5);
          world.setMoonPhase('WANING_CRESCENT');
        }}
        userData={{
          uneditable: true,
        }}>
        <Label position={[0, 0, 0.15]}>Waxing Crescenet</Label>
        <Box
          collision="static"
          color="#d3d3d3"
          width={2}
          height={1}
          depth={0.2}
          radius={BOX_RADIUS}
          material={{
            roughness: 0,
          }}
        />
      </Group>
      <Group
        position={[1.25, 1.5, 0.5]}
        onPointerDown={() => {
          world.setTimeRepresentation(5);
          world.setMoonPhase('FIRST_QUARTER');
        }}
        userData={{
          uneditable: true,
        }}>
        <Label position={[0, 0, 0.15]}>First Quarter</Label>
        <Box
          collision="static"
          color="#b5b5b5"
          width={2}
          height={1}
          depth={0.2}
          radius={BOX_RADIUS}
          material={{
            roughness: 0,
          }}
        />
      </Group>
      <Group
        position={[3.5, 1.5, 0.5]}
        onPointerDown={() => {
          world.setTimeRepresentation(5);
          world.setMoonPhase('WAXING_GIBBOUS');
        }}
        userData={{
          uneditable: true,
        }}>
        <Label position={[0, 0, 0.15]}>Waxomg Gibbous</Label>
        <Box
          collision="static"
          color="#999999"
          width={2}
          height={1}
          depth={0.2}
          radius={BOX_RADIUS}
          material={{
            roughness: 0,
          }}
        />
      </Group>

      <Group
        position={[-3.5, 0.25, 0.5]}
        onPointerDown={() => {
          world.setTimeRepresentation(5);
          world.setMoonPhase('FULL_MOON');
        }}
        userData={{
          uneditable: true,
        }}>
        <Label position={[0, 0, 0.15]}>Full Moon</Label>
        <Box
          collision="static"
          color="#7b7b7b"
          width={2}
          height={1}
          depth={0.2}
          radius={BOX_RADIUS}
          material={{
            roughness: 0,
          }}
        />
      </Group>
      <Group
        position={[-1.25, 0.25, 0.5]}
        onPointerDown={() => {
          world.setTimeRepresentation(5);
          world.setMoonPhase('WAXING_CRESCENT');
        }}
        userData={{
          uneditable: true,
        }}>
        <Label position={[0, 0, 0.15]}>Waning Crescent</Label>
        <Box
          collision="static"
          color="#555555"
          width={2}
          height={1}
          depth={0.2}
          radius={BOX_RADIUS}
          material={{
            roughness: 0,
          }}
        />
      </Group>
      <Group
        position={[1.25, 0.25, 0.5]}
        onPointerDown={() => {
          world.setTimeRepresentation(5);
          world.setMoonPhase('LAST_QUARTER');
        }}
        userData={{
          uneditable: true,
        }}>
        <Label position={[0, 0, 0.15]}>Last Quarter</Label>
        <Box
          collision="static"
          color="#363636"
          width={2}
          height={1}
          depth={0.2}
          radius={BOX_RADIUS}
          material={{
            roughness: 0,
          }}
        />
      </Group>
      <Group
        position={[3.5, 0.25, 0.5]}
        onPointerDown={() => {
          world.setTimeRepresentation(5);
          world.setMoonPhase('WANING_GIBBOUS');
        }}
        userData={{
          uneditable: true,
        }}>
        <Label position={[0, 0, 0.15]}>Waning Gibbous</Label>
        <Box
          collision="static"
          color="#1f1f1f"
          width={2}
          height={1}
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

export default MoonPhaseExample;
