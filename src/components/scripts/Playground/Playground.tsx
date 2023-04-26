import Provider from '@app/components/core/Provider';
import {formatUrl} from '@app/utils/misc';
import {RepeatWrapping} from '@verza/sdk';
import {Plane} from '@verza/sdk/react';

const PLAYGROUND_SIZE = 1024 * 2;

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
      <Plane
        id="playground_surface"
        surface
        restitution={0}
        position={[0, 0, 2]}
        rotation={[-Math.PI / 2, 0, 0]}
        width={PLAYGROUND_SIZE}
        height={PLAYGROUND_SIZE}
        widthSegments={10}
        heightSegments={10}
        material={{
          color: '#767676',
          map: {
            source: formatUrl(
              'playground/textures/prototype/Light/texture_13.png',
            ),
            repeat: [PLAYGROUND_SIZE / 4, PLAYGROUND_SIZE / 4],
            wrapS: RepeatWrapping,
            wrapT: RepeatWrapping,
          },
        }}
        userData={{
          uneditable: true,
        }}
      />
    </>
  );
};

export default Playground;
