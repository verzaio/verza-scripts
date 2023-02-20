import {Vector3} from '@verza/sdk';
import {
  Line,
  useEngine,
  useKey,
  useObjects,
  useRaycaster,
  useToolbarItemPress,
} from '@verza/sdk/react';
import {useState} from 'react';

import {TOOLBAR_IN_FRONT_ID} from '../EditorToolbar';

const FRONT_DISTANCE = 2;

const InFront = () => {
  const objects = useObjects();
  const engine = useEngine();
  const raycaster = useRaycaster();

  const [fromPoint, setFromPoint] = useState(new Vector3());
  const [toPoint, setToPoint] = useState(new Vector3());

  const bringToFront = async () => {
    if (!objects.editingObject) return;

    const object = objects.editingObject;

    const frontLocation = engine.player.location
      .clone()
      .translateZ(FRONT_DISTANCE);

    // move two meters above
    const fromLocation = frontLocation.clone();
    const toLocation = frontLocation.clone();

    fromLocation.translateY(2);
    toLocation.translateY(-2);

    const result = await raycaster.raycastPoints(
      fromLocation.position,
      toLocation.position,
      {
        entityTypes: ['object'],
        excludeObjects: [object.id],
      },
    );

    setFromPoint(fromLocation.position.clone());
    setToPoint(toLocation.position.clone());

    if (result.hit) {
      frontLocation.position.set(...result.hit.point);
    }

    const box = await object.computeBoundingBox();

    console.log('box', box);

    console.log('result y', result?.hit?.point[1]);

    object.setPositionFromWorldSpace(frontLocation.position);
    object.setRotationFromWorldSpace(frontLocation.rotation);
  };

  useToolbarItemPress(TOOLBAR_IN_FRONT_ID, bringToFront);

  useKey('KeyB', bringToFront);

  return (
    <Line
      color="red"
      key={Math.random()}
      points={[fromPoint.toArray(), toPoint.toArray()]}
    />
  );
};

export default InFront;
