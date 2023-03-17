import {ObjectManager} from '@verza/sdk';
import {Box} from '@verza/sdk/react';
import {useEffect, useRef} from 'react';

const MovingPlatforms = () => {
  const object1Ref = useRef<ObjectManager>(null!);

  useEffect(() => {
    const object1 = object1Ref.current;
    if (!object1) return;

    const animate = () => {
      const cubicBeizer = [1, 0.67, 0.22, 1.16] as any;

      object1.startTransitions([
        {
          from: [-10, 0.5, 15],
          fromRotation: [0, 0, 0],

          toRotation: [0, Math.PI / 2, 0],
          duration: 3000,
          cubicBezier: cubicBeizer,
          loop: true,
        },

        {
          id: 'end',
          toRotation: [0, 0, 0],
          duration: 3000,
          cubicBezier: cubicBeizer,
          loop: true,
        },
      ]);

      /* object1.startTransitions([
        {
          from: [-10, 0.5, 15],
          fromRotation: [0, 0, 0],

          to: [0, 0.5, 15],
          duration: 5000,
          easing: 'easeInOutQuad',
        },

        {
          toRotation: [0, Math.PI / 2, 0],
          duration: 5000,
          easing: 'easeInOutQuad',
        },

        {
          to: [-10, 0.5, 15],
          duration: 5000,
          easing: 'easeInOutQuad',
        },

        {
          id: 'end',
          toRotation: [0, 0, 0],
          duration: 5000,
          easing: 'easeInOutQuad',
        },
      ]); */
    };

    animate();
  }, []);

  return (
    <>
      <Box
        ref={object1Ref}
        collision="kinematicPosition"
        position={[-10, 0.5, 15]}
        width={5}
        height={0.2}
        depth={5}
        color="green"
      />
    </>
  );
};

export default MovingPlatforms;
