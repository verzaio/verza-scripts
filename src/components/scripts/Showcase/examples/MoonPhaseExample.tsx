import {uuid} from '@verza/sdk';
import {Box, Group, useWorld} from '@verza/sdk/react';
import Description from '../components/Description';
import Label from '../components/Label';
import SceneTitle from '../components/SceneTitle';
import {BOX_RADIUS} from '../constants';
import {SHOWCASE_LOCATION, SHOWCASE_SIZE} from '../Showcase';

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

/**
 * 
 * 'NEW_MOON',
      'WAXING_CRESCENT',
      'FIRST_QUARTER',
      'WAXING_GIBBOUS',
      'FULL_MOON',
      'WANING_CRESCENT',
      'LAST_QUARTER',
      'WANING_GIBBOUS'
 */

const Scene = () => {
  const {sky} = useWorld();
  return (
    <>
      <Group position={[-3.5, 1.5, 0.5]}>
        <Label position={[0, 0, 0.15]}>New Moon</Label>
        <Box
          color="orange"
          width={2}
          height={1}
          depth={0.2}
          radius={BOX_RADIUS}
          material={{
            roughness: 0,
          }}
          onPointerDown={() => {
            sky.setTimeRepresentation(5);
            sky.setMoonPhase('NEW_MOON');
          }}
        />
      </Group>
      <Group position={[-1.25, 1.5, 0.5]}>
        <Label position={[0, 0, 0.15]}>Waxing Crescenet</Label>
        <Box
          color="blue"
          width={2}
          height={1}
          depth={0.2}
          radius={BOX_RADIUS}
          material={{
            roughness: 0,
          }}
          onPointerDown={() => {
            sky.setTimeRepresentation(5);
            sky.setMoonPhase('WANING_CRESCENT');
          }}
        />
      </Group>
      <Group position={[1.25, 1.5, 0.5]}>
        <Label position={[0, 0, 0.15]}>First Quarter</Label>
        <Box
          color="red"
          width={2}
          height={1}
          depth={0.2}
          radius={BOX_RADIUS}
          material={{
            roughness: 0,
          }}
          onPointerDown={() => {
            sky.setTimeRepresentation(5);
            sky.setMoonPhase('FIRST_QUARTER');
          }}
        />
      </Group>
      <Group position={[3.5, 1.5, 0.5]}>
        <Label position={[0, 0, 0.15]}>Waxomg Gibbous</Label>
        <Box
          color="black"
          width={2}
          height={1}
          depth={0.2}
          radius={BOX_RADIUS}
          material={{
            roughness: 0,
          }}
          onPointerDown={() => {
            sky.setTimeRepresentation(5);
            sky.setMoonPhase('WAXING_GIBBOUS');
          }}
        />
      </Group>

      <Group position={[-3.5, 0.25, 0.5]}>
        <Label position={[0, 0, 0.15]}>Full Moon</Label>
        <Box
          color="purple"
          width={2}
          height={1}
          depth={0.2}
          radius={BOX_RADIUS}
          material={{
            roughness: 0,
          }}
          onPointerDown={() => {
            sky.setTimeRepresentation(5);
            sky.setMoonPhase('FULL_MOON');
          }}
        />
      </Group>
      <Group position={[-1.25, 0.25, 0.5]}>
        <Label position={[0, 0, 0.15]}>Waning Crescent</Label>
        <Box
          color="yellow"
          width={2}
          height={1}
          depth={0.2}
          radius={BOX_RADIUS}
          material={{
            roughness: 0,
          }}
          onPointerDown={() => {
            sky.setTimeRepresentation(5);
            sky.setMoonPhase('WANING_CRESCENT');
          }}
        />
      </Group>
      <Group position={[1.25, 0.25, 0.5]}>
        <Label position={[0, 0, 0.15]}>Last Quarter</Label>
        <Box
          color="green"
          width={2}
          height={1}
          depth={0.2}
          radius={BOX_RADIUS}
          material={{
            roughness: 0,
          }}
          onPointerDown={() => {
            sky.setTimeRepresentation(5);
            sky.setMoonPhase('LAST_QUARTER');
          }}
        />
      </Group>
      <Group position={[3.5, 0.25, 0.5]}>
        <Label position={[0, 0, 0.15]}>Waning Gibbous</Label>
        <Box
          color="gray"
          width={2}
          height={1}
          depth={0.2}
          radius={BOX_RADIUS}
          material={{
            roughness: 0,
          }}
          onPointerDown={() => {
            sky.setTimeRepresentation(5);
            sky.setMoonPhase('WANING_GIBBOUS');
          }}
        />
      </Group>
    </>
  );
};

export default MoonPhaseExample;
