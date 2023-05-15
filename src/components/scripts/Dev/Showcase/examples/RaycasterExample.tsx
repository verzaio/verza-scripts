import {useEffect, useRef, useState} from 'react';

import Description from '../components/Description';
import SceneTitle from '../components/SceneTitle';
import {SHOWCASE_LOCATION, SHOWCASE_SIZE} from '../Showcase';

import {ObjectManager, Vector3} from '@verza/sdk';
import {Group, Line, useRaycaster} from '@verza/sdk/react';

const FROM_POINT = new Vector3(0, 1, 2);
const TO_POINT = new Vector3(0, 1, 6);

const RaycasterExample = () => {
  const loc = SHOWCASE_LOCATION.clone();
  loc.translateZ(SHOWCASE_SIZE.y / 2 - 0.15);
  loc.rotateY(Math.PI);

  return (
    <Group position={loc.position} rotation={loc.quaternion}>
      <SceneTitle position={[0, 3.3, 0]}>Raycaster</SceneTitle>

      <Scene />
    </Group>
  );
};

const Scene = () => {
  const raycaster = useRaycaster();
  const lineRef = useRef<ObjectManager>(null!);
  const [inContact, setInContact] = useState<string | null>(null);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const POS1 = FROM_POINT.clone();
      const POS2 = TO_POINT.clone();

      lineRef.current.location.localToWorld(POS1);
      lineRef.current.location.localToWorld(POS2);

      const intersects = await raycaster.raycastPoints(POS1, POS2);

      setInContact(intersects.player?.entity.name ?? null);
    }, 100);

    return () => {
      clearInterval(intervalId);
    };
  }, [raycaster]);

  return (
    <>
      {inContact ? (
        <Description
          color="#00bc2f"
          position={[0, 1.7, 0]}>{`Hi ${inContact}!`}</Description>
      ) : (
        <Description position={[0, 1.7, 0]}>
          Get in contact with the line
        </Description>
      )}

      <Line
        color={inContact ? '#00bc2f' : '#fffffe'}
        ref={lineRef}
        points={[FROM_POINT.toArray(), TO_POINT.toArray()]}
      />
    </>
  );
};

export default RaycasterExample;
