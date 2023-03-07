import {Vector3} from '@verza/sdk';
import SampleBox from './SampleBox';

const Stairs = () => {
  const pos = new Vector3(-5, 0, -5);
  const size: [number, number, number] = [4, 0.2, 5];

  return (
    <>
      {new Array(100).fill(null).map((_, idx) => {
        return (
          <SampleBox
            key={idx}
            size={size}
            position={pos
              .clone()
              .add(new Vector3(-0.4 * idx, 0.2 * idx, 0))
              .toArray()}
            color="green"
          />
        );
      })}
    </>
  );
};

export default Stairs;
