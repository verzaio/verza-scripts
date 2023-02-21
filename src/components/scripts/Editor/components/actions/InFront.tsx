import {
  useEngine,
  useKey,
  useObjects,
  useRaycaster,
  useToolbarItemPress,
} from '@verza/sdk/react';

import {TOOLBAR_IN_FRONT_ID} from '../EditorToolbar';

const FRONT_DISTANCE = 2;

const FLOOR_DISTANCE = 2;

const InFront = () => {
  const objects = useObjects();
  const engine = useEngine();
  const raycaster = useRaycaster();

  const bringToFront = async () => {
    if (!objects.editingObject) return;

    const object = objects.editingObject;

    const frontLocation = engine.player.location
      .clone()
      .translateZ(FRONT_DISTANCE);

    const fromLocation = frontLocation.position.clone();
    const toLocation = frontLocation.position.clone();

    fromLocation.y += FLOOR_DISTANCE;
    toLocation.y -= -FLOOR_DISTANCE;

    const result = await raycaster.raycastPoints(fromLocation, toLocation, {
      entityTypes: ['object'],
      excludeObjects: [object.id],
    });

    if (result.hit) {
      frontLocation.position.set(...result.hit.point);
    }

    // put to floor level
    const box = await object.computeBoundingBox();
    frontLocation.position.y += (box.max.y - box.min.y) / 2;

    object.setPositionFromWorldSpace(frontLocation.position);
    object.setRotationFromWorldSpace(frontLocation.quaternion);
  };

  useToolbarItemPress(TOOLBAR_IN_FRONT_ID, bringToFront);

  useKey('KeyB', bringToFront);

  return null;
};

export default InFront;
