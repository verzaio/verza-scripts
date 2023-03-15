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
        id="blue-playground"
        url={formatUrl('playground/models/collision-world.glb')}
        position={[-60, 4, 0]}
        userData={{
          uneditable: true,
        }}
      />

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
