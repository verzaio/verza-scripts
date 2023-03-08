import {ObjectManager} from '@verza/sdk';
import {Box} from '@verza/sdk/react';
import {useRef} from 'react';

const InteractiveBoxes = () => {
  const box1Ref = useRef<ObjectManager>(null!);
  const box2Ref = useRef<ObjectManager>(null!);

  /* useEffect(() => {
    const box1 = box1Ref.current;
    const onPointerUp = box1?.events.on('onPointerUp', () => {
      console.log('onPointerUp');
    });
    const onPointerDown = box1?.events.on('onPointerDown', () => {
      console.log('onPointerDown');
    });

    const box2 = box2Ref.current;
    const onPointerEnter = box2?.events.on('onPointerEnter', () => {
      console.log('onPointerEnter event');
      box2.setProps({
        color: 'purple',
      });
    });

    const onPointerLeave = box2?.events.on('onPointerLeave', () => {
      console.log('onPointerLeave event');
      box2.setProps({
        color: 'yellow',
      });
    });

    return () => {
      box1?.events.off('onPointerUp', onPointerUp);
      box1?.events.off('onPointerDown', onPointerDown);

      //box2?.events.off('onPointerMove', onPointerMove);
      box2?.events.off('onPointerEnter', onPointerEnter);
      box2?.events.off('onPointerLeave', onPointerLeave);
    };
  }, []); */

  return (
    <>
      <Box
        id="my-box"
        onPointerUp={() => {
          console.log('onPointerDown');
        }}
        onPointerDown={() => {
          console.log('onPointerDown');
        }}
        color="green"
        ref={box1Ref}
        position={[1, 1, 1]}
      />

      <Box
        id="my-box2"
        onPointerEnter={event => {
          event.object.setProps({
            color: 'purple',
          });
        }}
        onPointerLeave={event => {
          event.object.setProps({
            color: 'yellow',
          });
        }}
        color="red"
        ref={box2Ref}
        position={[0, 1, 1]}
      />
    </>
  );
};

export default InteractiveBoxes;
