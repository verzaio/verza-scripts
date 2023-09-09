'use client';

import {useEffect} from 'react';

import Provider from '@app/components/core/Provider';
import {formatUrl} from '@app/utils/misc.utils';
import {RepeatWrapping} from '@verza/sdk';
import {Plane, useEngine} from '@verza/sdk/react';

const PLAYGROUND_SIZE = 1024 * 2;

const PlaygroundPage = () => {
  return (
    <Provider>
      <PlaygroundRender />
    </Provider>
  );
};

const PlaygroundRender = () => {
  const {audio} = useEngine();

  useEffect(() => {
    const sound = audio.createSound('ambience/ambience-city-1', {
      position: [0, 0, 0],
      type: 'ambience',
      loop: 'repeat',
      volume: 0.2,
      maxDistance: 100,
      autoplay: true,
    });

    return () => {
      sound.destroy();
    };
  }, [audio]);

  return (
    <Plane
      id="playground_surface"
      surface
      collision="static"
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
  );
};

export default PlaygroundPage;
