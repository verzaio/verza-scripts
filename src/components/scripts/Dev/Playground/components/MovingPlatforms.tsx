import {useEffect, useRef} from 'react';

import {ObjectManager} from '@verza/sdk';
import {Box} from '@verza/sdk/react';

const MovingPlatforms = () => {
  const object1Ref = useRef<ObjectManager>(null!);

  useEffect(() => {
    const object1 = object1Ref.current;
    if (!object1) return;

    const animate = () => {
      object1.startTransitions([
        {
          from: [-10, 0.5, 15],
          fromRotation: [0, 0, 0],

          toRotation: [0, Math.PI / 2, 0],
          duration: 5000,
          loop: true,

          easing: 'easeInOutQuad',
        },

        {
          duration: 1500,
          loop: true,
        },

        {
          toRotation: [0, 0, 0],
          duration: 5000,
          loop: true,

          easing: 'easeInOutQuad',
        },

        {
          id: 'end',
          duration: 1500,
          loop: true,
        },
        /* {
          //from: [-10, 0.5, 15],
          fromRotation: [0, 0, 0],
          toRotation: [0, Math.PI, 0],
          duration: 3000,
          loop: true,
        },
        {
          toRotation: [0, Math.PI * 2, 0],
          duration: 3000,
          loop: true,
        }, */
      ]);
    };

    animate();
  }, []);

  return (
    <>
      <Box
        ref={object1Ref}
        collision="kinematicPosition"
        position={[-10, 0.5, 15]}
        width={10}
        height={0.2}
        depth={10}
        color="green"
      />
    </>
  );
};

export default MovingPlatforms;
