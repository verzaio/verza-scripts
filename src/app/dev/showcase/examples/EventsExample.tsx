import Description from '../components/Description';
import Label from '../components/Label';
import SceneTitle from '../components/SceneTitle';
import {BOX_RADIUS} from '../constants';
import {SHOWCASE_LOCATION, SHOWCASE_SIZE} from '../page';

import {Box, Group} from '@verza/sdk/react';
import {uuid} from '@verza/sdk/utils';

const EventsExample = () => {
  const loc = SHOWCASE_LOCATION.clone();
  loc.translateZ(SHOWCASE_SIZE.y / 2 - 0.15);
  loc.translateX(25);
  loc.rotateY(Math.PI);

  return (
    <Group key={uuid()} position={loc.position} rotation={loc.quaternion}>
      <SceneTitle position={[0, 3.3, 0]}>Events</SceneTitle>

      <Description position={[0, 2.5, 0]}>Built-in Entity Events</Description>

      <Scene />
    </Group>
  );
};

const Scene = () => {
  return (
    <>
      <Group
        position={[-3, 1.2 / 2, 4]}
        userData={{
          uneditable: true,
        }}>
        <Label position={[0, 1, 0]}>I will deform on aim</Label>

        <Box
          collision="static"
          color="#0e82ff"
          width={1.2}
          height={1.2}
          depth={1.2}
          radius={BOX_RADIUS}
          material={{
            roughness: 0,
          }}
          onPointerEnter={event => {
            event.object.setRotation([Math.PI / 3, 0, Math.PI / 3]);
            event.object.setProps({
              color: '#00c45f',
              width: 2,
              depth: 0.5,
            });
          }}
          onPointerLeave={event => {
            event.object.setRotation([0, 0, 0]);
            event.object.setProps({
              color: '#0e82ff',
              width: 1.2,
              depth: 1.2,
            });
          }}
        />
      </Group>

      <Group
        position={[0, 1.2 / 2, 4]}
        userData={{
          uneditable: true,
        }}>
        <Label position={[0, 1, 0]}>I will bounce on click</Label>

        <Box
          collision="dynamic"
          color="#fff70e"
          width={1.2}
          height={1.2}
          depth={1.2}
          radius={BOX_RADIUS}
          material={{
            roughness: 0,
          }}
          onPointerDown={event => {
            event.object.setLinearVelocity([0, 7, 0]);
            event.object.setAngularVelocity([0, 7, 0]);
          }}
        />
      </Group>

      <Group
        position={[3, 1.2 / 2, 4]}
        userData={{
          uneditable: true,
        }}>
        <Label position={[0, 1, 0]}>I will disappear on click</Label>

        <Box
          collision="static"
          color="#f92020"
          width={1.2}
          height={1.2}
          depth={1.2}
          radius={BOX_RADIUS}
          material={{
            roughness: 0,
          }}
          onPointerDown={event => {
            event.object.setVisible(false);

            setTimeout(() => {
              event.object.setVisible(true);
            }, 1000);
          }}
        />
      </Group>
    </>
  );
};

export default EventsExample;
