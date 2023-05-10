import {formatUrl} from '@app/utils/misc';
import {Gltf} from '@verza/sdk/react';

const Models = () => {
  return (
    <>
      <Gltf
        url={formatUrl('dev/playground/models/chair.glb')}
        scale={[0.1, 0.1, 0.1]}
        position={[3, 1, 4]}
        collision="dynamic"
        mass={500}
      />

      <Gltf
        id="blue-playground"
        url={formatUrl('dev/playground/models/collision-world.glb')}
        position={[-60, 4, 0]}
        userData={{
          uneditable: true,
        }}
      />

      {/* <Gltf
        url={formatUrl('dev/playground/models/sponza/Sponza.gltf')}
        position={[-60, 0.2, 60]}
        userData={{
          uneditable: true,
        }}
      /> */}
    </>
  );
};

export default Models;
