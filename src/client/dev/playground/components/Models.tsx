import {Gltf} from '@verza/sdk/react';

import {formatUrl} from '@app/shared/utils/misc.utils';

const Models = () => {
  return (
    <>
      <Gltf
        url={formatUrl('assets/dev/playground/models/chair.glb')}
        scale={[0.1, 0.1, 0.1]}
        position={[3, 1, 4]}
        collision="dynamic"
        mass={500}
      />

      <Gltf
        id="blue-playground"
        url={formatUrl('assets/dev/playground/models/collision-world.glb')}
        position={[-60, 4, 0]}
        collision="static"
        userData={{
          uneditable: true,
        }}
      />

      {/* <Gltf
        url={formatUrl('assets/dev/playground/models/sponza/Sponza.gltf')}
        position={[-60, 0.2, 60]}
        collision="static"
        userData={{
          uneditable: true,
        }}
      /> */}
    </>
  );
};

export default Models;
