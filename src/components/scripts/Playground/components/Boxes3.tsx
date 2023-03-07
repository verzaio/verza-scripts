import {Box} from '@verza/sdk/react';

const Boxes3 = () => {
  return (
    <>
      <Box
        width={10}
        height={10}
        depth={1}
        color="orange"
        position={[-5, 0.5, -10]}
      />

      <Box
        width={5}
        height={5}
        depth={1}
        color="orange"
        position={[-3, 0.5, -12]}
      />

      <Box color="blue" position={[12, 1, 2]} collision="dynamic" />

      <Box
        width={7}
        height={1}
        depth={7}
        color="purple"
        collision="kinematic"
        position={[12, 0.2 / 2, 2]}
      />
    </>
  );
};

export default Boxes3;
