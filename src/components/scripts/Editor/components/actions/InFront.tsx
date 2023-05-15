import {useEditor} from '../../EditorProvider';
import {TOOLBAR_IN_FRONT_ID} from '../../misc/constants';
import {bringToFront} from '../../misc/utils';

import {
  useEngine,
  useKey,
  useRaycaster,
  useToolbarItemPress,
} from '@verza/sdk/react';

const InFront = () => {
  const editor = useEditor();
  const engine = useEngine();
  const raycaster = useRaycaster();

  const _bringToFront = () => {
    if (!editor.activeObject) return;

    return bringToFront(engine.localPlayer, editor.activeObject, raycaster);
  };

  useToolbarItemPress(TOOLBAR_IN_FRONT_ID, _bringToFront);

  useKey('KeyB', _bringToFront);

  return null;
};

export default InFront;
