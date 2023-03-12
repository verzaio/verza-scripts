import {ObjectManager} from '@verza/sdk';
import {Box, Sphere, useOnTicks} from '@verza/sdk/react';
import {useRef} from 'react';

const Boxes = () => {
  const boxRef = useRef<ObjectManager>(null!);

  useOnTicks(() => {
    const box = boxRef.current;
    if (!box) return;

    box.setRotation(box.location.clone().rotateX(Math.PI / 3).rotation);
  }, 1);

  return (
    <>
      <Box position={[5, 4, 0]} mass={20} color="yellow" collision="dynamic" />

      <Box ref={boxRef} id="box-test" position={[0, 2, 5]} color="violet" />

      <Sphere
        id="sphere-test"
        position={[-4, 4, 4]}
        collision="dynamic"
        mass={500}
        color="green"
      />

      <>
        <Box
          position={[4, 0.3, -5]}
          color="yellow"
          width={3}
          height={1}
          depth={1.5}
        />

        <Box
          position={[4, 0.3, -8]}
          color="purple"
          width={3}
          height={1}
          depth={1.5}
        />

        <Box
          position={[4, 0.3, -10.5]}
          color="purple"
          width={3}
          height={1}
          depth={1.5}
        />

        <Box
          position={[4, 0.3, -12.5]}
          color="purple"
          width={3}
          height={1}
          depth={1.5}
        />

        <Box
          position={[-2, 1, -15]}
          color="red"
          width={3}
          height={1}
          depth={3.5}
        />

        <Box
          position={[-2, 0.8, -15]}
          color="red"
          width={3}
          height={1}
          depth={3.5}
        />

        <Box
          position={[-3, 1.6, -15]}
          color="red"
          width={3}
          height={1}
          depth={3.5}
        />

        <Box
          position={[-1, 0.3, -15]}
          color="red"
          width={3}
          height={1}
          depth={3.5}
        />

        <Box
          position={[-4, 2.3, -15]}
          color="red"
          width={3}
          height={1}
          depth={3.5}
        />

        <Box
          position={[-4, 2.3, -18]}
          color="red"
          width={3}
          height={1}
          depth={3.5}
        />

        <Box
          position={[-4, 2.3, -24]}
          color="red"
          width={4}
          height={1}
          depth={4}
        />

        <Box
          position={[-4, 2.3, -29]}
          color="red"
          width={4}
          height={1}
          depth={4}
        />

        <Box
          position={[-4, 2.3, -35]}
          color="red"
          width={4}
          height={1}
          depth={4}
        />
      </>
    </>
  );
};

export default Boxes;
