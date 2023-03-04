import {
  useEngine,
  useKey,
  useObjects,
  useRaycaster,
  useToolbarItemPress,
} from '@verza/sdk/react';

import {TOOLBAR_IN_FRONT_ID} from '../EditorToolbar';
import {bringToFront} from '../utils/all';

const InFront = () => {
  const objects = useObjects();
  const engine = useEngine();
  const raycaster = useRaycaster();

  const _bringToFront = () => {
    if (!objects.editingObject) return;

    return bringToFront(engine.localPlayer, objects.editingObject, raycaster);
  };

  useToolbarItemPress(TOOLBAR_IN_FRONT_ID, _bringToFront);

  useKey('KeyB', _bringToFront);

  return null;
};

export default InFront;
