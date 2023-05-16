import {Box} from '@verza/sdk/react';
import {MathUtils} from '@verza/sdk/utils';

const Plane = () => {
  return (
    <>
      <Box
        collision="static"
        position={[15, 0.5, -20]}
        rotation={[0, 0, MathUtils.degToRad(25)]}
        material={{
          color: 'blue',
          opacity: 0.8,
          transparent: true,
        }}
        width={60}
        height={1}
        depth={10}
        userData={{
          uneditable: true,
        }}
      />

      <Box
        collision="static"
        position={[15, 0.5, -10]}
        rotation={[0, 0, MathUtils.degToRad(10)]}
        material={{
          color: 'blue',
          opacity: 0.8,
          transparent: true,
        }}
        width={60}
        height={1}
        depth={10}
        userData={{
          uneditable: true,
        }}
      />
    </>
  );
};

export default Plane;
