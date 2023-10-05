import SceneTitle from '../components/SceneTitle';
import {SHOWCASE_LOCATION, SHOWCASE_SIZE} from '../constants';

import {Vector3} from '@verza/sdk';
import {Box, Group} from '@verza/sdk/react';
import {MathUtils, uuid} from '@verza/sdk/utils';

const ProximityActionsExample = () => {
  const loc = SHOWCASE_LOCATION.clone();
  loc.translateX(-5);
  loc.translateZ(-SHOWCASE_SIZE.y / 2 + 0.15);
  loc.translateY(0.5);

  return (
    <Group key={uuid()} position={loc.position} rotation={loc.quaternion}>
      <SceneTitle position={[0, 3.3, 0]}>Proximity Actions</SceneTitle>

      <Scene />
    </Group>
  );
};

const Scene = () => {
  return (
    <>
      <Group
        position={[0.0, 0, 2.0]}
        userData={{
          uneditable: true,
        }}>
        <Box
          color="#e75b5b"
          onProximityActionTriggered={event => {
            event.object.setProps({
              color: `rgb(${MathUtils.randInt(0, 255)}, ${MathUtils.randInt(
                0,
                255,
              )}, ${MathUtils.randInt(0, 255)})`,
            });
          }}
          proximityAction={{
            label: 'Change color',

            description: 'Change to a random color',

            key: 'KeyF',

            distance: 5,
          }}
        />

        <Box
          position={[-3, 0, 0]}
          color="#22b6f1"
          onProximityActionTriggered={event => {
            event.object.startTransition({
              to: event.object.position.add(new Vector3(0, 0, 1)),
              speed: 5,
            });
          }}
          proximityAction={{
            label: 'Move Forward',

            key: 'Digit1',

            distance: 5,
          }}
        />

        <Box
          position={[3, 0, 0]}
          color="#17f229"
          collision="dynamic"
          onProximityActionTriggered={event => {
            event.object.applyImpulse([0, 8, 0]);
          }}
          proximityAction={{
            label: 'Make It Fly!',

            key: 'KeyF',

            distance: 5,
          }}
        />
      </Group>
    </>
  );
};

export default ProximityActionsExample;
