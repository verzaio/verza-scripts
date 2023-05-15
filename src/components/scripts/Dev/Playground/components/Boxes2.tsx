import {useRef, useState} from 'react';

import SampleBox from './SampleBox';

import {ObjectManager, Vector3} from '@verza/sdk';

const Boxes2 = () => {
  const [pos1] = useState(() => new Vector3(10, 0.5, 10));

  const [pos2] = useState(() => new Vector3(30, 3, 10));

  const box = useRef<ObjectManager<'box'>>(null!);

  return (
    <>
      <SampleBox position={pos1.toArray()} />

      <SampleBox
        ref={box}
        position={pos1.clone().addScalar(5).setY(0.5).toArray()}
        rotation={[0, 0, 0]}
        color="orange"
      />

      <SampleBox
        position={pos1.clone().addScalar(5).setY(0.5).toArray()}
        rotation={[0, 0, 0]}
        color="#ffffff"
      />

      <SampleBox
        position={pos1.clone().lerp(pos2, 0.5).toArray()}
        rotation={[0, 0, 0]}
        color="#1dfcf5"
      />

      <SampleBox
        position={pos1.clone().divideScalar(2).toArray()}
        color="red"
      />

      <SampleBox position={pos1.clone().add(new Vector3(0, 0, 1)).toArray()} />
    </>
  );
};

export default Boxes2;
