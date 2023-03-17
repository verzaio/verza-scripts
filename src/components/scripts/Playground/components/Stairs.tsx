import {formatUrl} from '@app/utils/misc';
import {Vector3} from '@verza/sdk';
import {Gltf} from '@verza/sdk/react';
import SampleBox from './SampleBox';

const Stairs = () => {
  const pos = new Vector3(-5, 0, -5);
  const size: [number, number, number] = [4, 0.2, 5];

  return (
    <>
      <Gltf
        url={formatUrl('playground/models/stairs/double_stairs.glb')}
        position={[-20, 0, 5]}
        scale={0.02}
        userData={{
          uneditable: true,
        }}
      />

      <Gltf
        url={formatUrl('playground/models/stairs/double_stairs.glb')}
        position={[-26, 0, 5]}
        scale={0.016}
        userData={{
          uneditable: true,
        }}
      />

      <Gltf
        url={formatUrl('playground/models/stairs/double_stairs.glb')}
        position={[-31, 0, 5]}
        scale={0.013}
        userData={{
          uneditable: true,
        }}
      />

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
