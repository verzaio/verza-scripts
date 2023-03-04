import {PlayerManager, ObjectManager, RaycasterManager} from '@verza/sdk';

const FRONT_DISTANCE = 2;

const FLOOR_DISTANCE = 2;

export const bringToFront = async (
  player: PlayerManager,
  object: ObjectManager,
  raycaster: RaycasterManager,
) => {
  const frontLocation = player.location.clone().translateZ(FRONT_DISTANCE);

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
  const worldPosition = await object.worldLocation;

  const box = await object.computeBoundingBox();
  frontLocation.position.y += worldPosition.position.y - box.min.y;

  object.setPositionFromWorldSpace(frontLocation.position);
  object.setRotationFromWorldSpace(frontLocation.quaternion);
};
