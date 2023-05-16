import {useEditor} from '../../EditorProvider';
import {TOOLBAR_GROUND_ID} from '../../misc/constants';

import {useKey, useRaycaster, useToolbarItemPress} from '@verza/sdk/react';

const FLOOR_DISTANCE = 200;

const Ground = () => {
  const editor = useEditor();
  const raycaster = useRaycaster();

  const putToGround = async () => {
    if (!editor.activeObject) return;

    const object = editor.activeObject;

    const worldLocation = await object.worldLocation;
    const fromLocation = worldLocation.position.clone();
    const toLocation = worldLocation.position.clone();

    // first ray | origin -> down
    toLocation.y -= FLOOR_DISTANCE;

    let result = await raycaster.raycastPoints(fromLocation, toLocation, {
      filterEntityTypes: ['object'],
      excludeObjectIds: [object.id],
    });

    if (!result.hit) {
      // second ray | top -> origin -> down
      toLocation.y -= -FLOOR_DISTANCE;
      fromLocation.y += FLOOR_DISTANCE;

      result = await raycaster.raycastPoints(fromLocation, toLocation, {
        filterEntityTypes: ['object'],
        excludeObjectIds: [object.id],
      });
    }

    // abort if hit not found
    if (!result.hit) return;

    // set hit position
    toLocation.set(...result.hit.point);

    // get bounding box and set it from its base
    const box = await object.computeBoundingBox();
    toLocation.y += worldLocation.position.y - box.min.y;

    // set from world space, hits are always in world-space
    object.setPositionFromWorldSpace(toLocation);
  };

  useToolbarItemPress(TOOLBAR_GROUND_ID, putToGround);

  useKey('KeyG', putToGround);

  return null;
};

export default Ground;
