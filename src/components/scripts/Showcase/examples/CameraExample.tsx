import {uuid} from '@verza/sdk';
import {Box, Group} from '@verza/sdk/react';
import Description from '../components/Description';
import Label from '../components/Label';
import SceneTitle from '../components/SceneTitle';
import {BOX_RADIUS} from '../constants';
import {SHOWCASE_LOCATION, SHOWCASE_SIZE} from '../Showcase';

const CameraExample = () => {
  const loc = SHOWCASE_LOCATION.clone();
  loc.translateZ(SHOWCASE_SIZE.y / 2 - 0.15);
  loc.translateX(40);
  loc.rotateY(Math.PI);

  return (
    <Group key={uuid()} position={loc.position} rotation={loc.quaternion}>
      <SceneTitle position={[0, 3.8, 0]}>Camera</SceneTitle>

      <Description position={[0, 3, 0]}>
        Full control & Transitions (built-in easing!)
      </Description>

      <Scene />
    </Group>
  );
};

const Scene = () => {
  return (
    <>
      <Group position={[-3, 0, 4]}>
        <Group position={[0, 1.8, 0.12]}>
          <Label fontSize={0.15} textAlign="center">
            Fixed Position
          </Label>

          <Label
            position={[0, -0.7, 0]}
            fontSize={0.1}
            textAlign="center"
            color="#898989">
            Click to play
          </Label>
        </Group>

        <Box
          color="#0e82ff"
          position={[0, 1.5, 0]}
          width={1.5}
          height={2}
          depth={0.2}
          radius={BOX_RADIUS}
          material={{
            roughness: 0,
          }}
          onPointerDown={event => {
            const localPlayer = event.object.engine.localPlayer;

            const loc = localPlayer.location.clone();
            loc.translateX(-10);
            loc.translateY(15);
            loc.translateZ(-10);

            localPlayer.camera.setMode('world');

            localPlayer.camera.setPosition({
              to: loc.position,
              lookAt: localPlayer.position,
            });

            setTimeout(() => {
              localPlayer.camera.setMode('player');
            }, 2000);
          }}
        />
      </Group>

      <Group position={[0, 0, 4]}>
        <Group position={[0, 1.8, 0.12]}>
          <Label fontSize={0.15} textAlign="center">
            Transition
          </Label>

          <Label
            position={[0, -0.7, 0]}
            fontSize={0.1}
            textAlign="center"
            color="#898989">
            Click to play
          </Label>
        </Group>

        <Box
          color="#ff24ba"
          position={[0, 1.5, 0]}
          width={1.5}
          height={2}
          depth={0.2}
          radius={BOX_RADIUS}
          material={{
            roughness: 0,
          }}
          onPointerDown={event => {
            const localPlayer = event.object.engine.localPlayer;

            const loc = localPlayer.location.clone();

            localPlayer.camera.setMode('world');

            localPlayer.camera.startTransitions([
              {
                to: loc.clone().translateY(30).translateZ(-40).translateX(-80)
                  .position,
                lookAt: localPlayer.position,
                duration: 3000,
                easing: 'easeInOutQuad',
              },
              {
                to: loc.clone().translateY(15).translateX(-20).position,
                lookAt: localPlayer.position,
                duration: 3000,
                easing: 'easeInOutQuad',
              },
              {
                to: loc.clone().translateY(5).translateZ(-10).position,
                lookAt: localPlayer.position.clone(),
                duration: 3000,
                easing: 'easeInOutQuad',
              },
            ]);

            setTimeout(() => {
              localPlayer.camera.setMode('player', false);
            }, 9000);
          }}
        />
      </Group>

      <Group position={[3, 0, 4]}>
        <Group position={[0, 1.8, 0.12]}>
          <Label fontSize={0.15} textAlign="center">
            Bouncing Effect
          </Label>

          <Label
            position={[0, -0.7, 0]}
            fontSize={0.1}
            textAlign="center"
            color="#898989">
            Click to play
          </Label>
        </Group>

        <Box
          color="#06ffa8"
          position={[0, 1.5, 0]}
          width={1.5}
          height={2}
          depth={0.2}
          radius={BOX_RADIUS}
          material={{
            roughness: 0,
          }}
          onPointerDown={event => {
            const localPlayer = event.object.engine.localPlayer;

            const loc = localPlayer.location.clone();

            localPlayer.camera.setMode('world');

            localPlayer.camera.startTransitions([
              {
                to: loc.clone().translateY(15).translateX(-20).position,
                lookAt: localPlayer.position,
                duration: 3000,
                easing: 'easeInOutBounce',
              },
              {
                to: loc.clone().translateY(5).translateZ(-10).position,
                lookAt: localPlayer.position.clone(),
                duration: 3000,
                easing: 'easeOutBounce',
              },
            ]);

            setTimeout(() => {
              localPlayer.camera.setMode('player', false);
            }, 6000);
          }}
        />
      </Group>
    </>
  );
};

export default CameraExample;
