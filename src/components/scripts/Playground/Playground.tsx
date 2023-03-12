import Provider from '@app/components/core/Provider';
import {formatUrl} from '@app/utils/misc';
import {Gltf} from '@verza/sdk/react';
import Boxes from './components/Boxes';
import Boxes2 from './components/Boxes2';
import Boxes3 from './components/Boxes3';
import Plane from './components/Plane';
import Stairs from './components/Stairs';

const Playground = () => {
  return (
    <Provider>
      <PlaygroundRender />
    </Provider>
  );
};

const PlaygroundRender = () => {
  return (
    <>
      <Gltf
        url={formatUrl('playground/models/chair.glb')}
        scale={[0.1, 0.1, 0.1]}
        position={[3, 1, 4]}
        collision="dynamic"
        mass={500}
      />

      <Gltf
        url={formatUrl('playground/models/collision-world.glb')}
        position={[-60, 4, 0]}
      />

      {/* <Gltf
        url={formatUrl('playground/models/sponza/Sponza.gltf')}
        position={[-60, 0.2, 60]}
        userData={{
          uneditable: true,
        }}
      /> */}

      <Boxes />

      <Boxes2 />

      <Boxes3 />

      <Plane />

      <Stairs />
    </>
  );
};

export default Playground;
