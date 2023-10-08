import {useEngine, useKey, useToolbarItemPress} from '@verza/sdk/react';

import {useEditor} from '../EditorProvider';
import {TOOLBAR_DUPLICATE_ID} from '../misc/constants';

const Duplicate = () => {
  const editor = useEditor();
  const engine = useEngine();

  const duplicate = async () => {
    if (!editor.activeObject) return;

    await editor.cloneObject(editor.activeObject);

    engine.localPlayer.sendSuccessNotification('Object duplicated', 1000);
  };

  useToolbarItemPress(TOOLBAR_DUPLICATE_ID, duplicate);

  useKey('KeyE', duplicate);

  return null;
};

export default Duplicate;
