import {Vector3Array} from '@verza/sdk';
import {Box} from '@verza/sdk/react';

const Poles = () => {
  return (
    <>
      <Box
        position={[18, 1.3, 24]}
        material={{
          color: 'red',
        }}
        width={5}
        height={1}
        depth={0.2}
        userData={{
          uneditable: true,
        }}
      />

      <Pole position={[10, 1.5, 20]} />
      <Pole position={[11, 1.5, 20]} />
      <Pole position={[12, 1.5, 20]} />
      <Pole position={[13, 1.5, 20]} />

      <Pole position={[10, 1.5, 21]} />
      <Pole position={[11, 1.5, 22]} />
      <Pole position={[12, 1.5, 23]} />
      <Pole position={[13, 1.5, 24]} />

      <Pole position={[10, 1.5, 25]} />
      <Pole position={[11, 1.5, 26]} />
      <Pole position={[12, 1.5, 27]} />
      <Pole position={[13, 1.5, 28]} />
    </>
  );
};

type PoleProps = {
  position: Vector3Array;
};

const Pole = ({position}: PoleProps) => {
  return (
    <Box
      position={position}
      material={{
        color: 'blue',
      }}
      width={0.2}
      height={3}
      depth={0.2}
      userData={{
        uneditable: true,
      }}
    />
  );
};

export default Poles;
