import {ObjectManager} from '@verza/sdk';
import {Box, Group, Sphere} from '@verza/sdk/react';
import {useEffect, useRef} from 'react';
import Description from '../components/Description';
import SceneTitle from '../components/SceneTitle';
import {BOX_RADIUS} from '../constants';
import {SHOWCASE_LOCATION, SHOWCASE_SIZE} from '../Showcase';

const PhysicsExample = () => {
  const loc = SHOWCASE_LOCATION.clone();
  loc.translateZ(SHOWCASE_SIZE.y / 2 - 0.15);
  loc.translateX(12);
  loc.rotateY(Math.PI);

  return (
    <Group position={loc.position} rotation={loc.quaternion}>
      <SceneTitle position={[0, 3.3, 0]}>Physics</SceneTitle>

      <Description position={[0, 2.5, 0]}>
        Collisionless, Static, Kinematic & Dynamic Support
      </Description>

      <Scene />
    </Group>
  );
};

const Scene = () => {
  const object1Ref = useRef<ObjectManager<'sphere'>>(null!);
  const object2Ref = useRef<ObjectManager<'sphere'>>(null!);
  const object3Ref = useRef<ObjectManager<'sphere'>>(null!);

  useEffect(() => {
    const setPos = () => {
      object1Ref.current.setPosition([0, 4, 3.7]);
      object2Ref.current.setPosition([0, 4, 3.7]);
      object3Ref.current.setPosition([0, 4, 3.7]);
    };

    setPos();

    const intervalId = setInterval(setPos, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <>
      <Box
        color="rgb(53, 110, 255)"
        position={[2, 0.5, 3]}
        radius={BOX_RADIUS}
      />

      <Box color="#01ff73" position={[0, 0.5, 3]} radius={BOX_RADIUS} />

      <Box
        color="#ff5100"
        position={[-2, 0.5, 3]}
        collision={null}
        radius={BOX_RADIUS}
      />

      <Box
        color="#2cf0fe"
        position={[0, 0.5, 5]}
        collision="dynamic"
        radius={BOX_RADIUS}
      />

      <Sphere
        ref={object1Ref}
        color="#ff1599"
        position={[0, 4, 3.7]}
        scale={2}
        collision="dynamic"
        radius={0.3}
      />

      <Sphere
        ref={object2Ref}
        color="#ff1599"
        position={[0, 4, 3.7]}
        collision="dynamic"
        radius={0.5}
      />

      <Sphere
        ref={object3Ref}
        color="#ff1599"
        position={[0, 4, 3.7]}
        collision="dynamic"
        radius={0.7}
      />
    </>
  );
};

export default PhysicsExample;
