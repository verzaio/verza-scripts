import {useEditor} from '../EditorProvider';
import {TOOLBAR_DUPLICATE_ID} from '../misc/constants';

import {useEngine, useKey, useToolbarItemPress} from '@verza/sdk/react';

const Duplicate = () => {
  const editor = useEditor();
  const engine = useEngine();

  const duplicate = async () => {
    if (!editor.activeObject) return;

    const editingObject = editor.activeObject;

    const object = await editingObject.clone();

    // select to edit
    editor.editObject(object);

    // make object permanent only if
    // the editing object is permanent
    if (editingObject.permanent) {
      object.save();
    }

    engine.localPlayer.sendSuccessNotification('Object duplicated', 1000);
  };

  useToolbarItemPress(TOOLBAR_DUPLICATE_ID, duplicate);

  useKey('KeyE', duplicate);

  return null;
};

export default Duplicate;
