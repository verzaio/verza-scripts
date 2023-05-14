import {
  useEngine,
  useKey,
  useObjects,
  useToolbarItemPress,
} from '@verza/sdk/react';
import {TOOLBAR_DUPLICATE_ID} from '../../misc/constants';
import {useEditor} from '../../EditorProvider';

const Duplicate = () => {
  const editor = useEditor();
  const objects = useObjects();
  const engine = useEngine();

  const duplicate = async () => {
    if (!objects.editingObject) return;

    const editingObject = objects.editingObject;

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
