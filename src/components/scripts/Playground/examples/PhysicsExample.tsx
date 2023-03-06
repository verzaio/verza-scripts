import {ObjectManager} from '@verza/sdk';
import {Box, Group, Sphere} from '@verza/sdk/react';
import {useEffect, useRef} from 'react';
import SceneTitle from '../components/SceneTitle';
import {SHOWCASE_LOCATION, SHOWCASE_SIZE} from '../Playground';

const PhysicsExample = () => {
  const loc = SHOWCASE_LOCATION.clone();
  loc.translateZ(SHOWCASE_SIZE.x / 2 - 0.15);
  loc.translateX(10);
  loc.rotateY(Math.PI);

  return (
    <Group position={loc.position} rotation={loc.quaternion}>
      <SceneTitle position={[0, 3.5, 0]}>Physics</SceneTitle>

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
      <Box color="red" position={[0, 0.5, 3]} />

      <Box color="blue" position={[2, 0.5, 3]} />

      <Box color="orange" position={[-2, 0.5, 3]} />

      <Sphere
        ref={object1Ref}
        color="green"
        position={[0, 4, 3.7]}
        collision="dynamic"
        radius={0.5}
      />

      <Sphere
        ref={object2Ref}
        color="green"
        position={[0, 4, 3.7]}
        collision="dynamic"
        radius={0.5}
      />

      <Sphere
        ref={object3Ref}
        color="green"
        position={[0, 4, 3.7]}
        collision="dynamic"
        radius={0.5}
      />
    </>
  );
};

export default PhysicsExample;
