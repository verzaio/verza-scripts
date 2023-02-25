import {
  useEngine,
  useKey,
  useObjects,
  useToolbarItemPress,
} from '@verza/sdk/react';
import {TOOLBAR_DUPLICATE_ID} from '../EditorToolbar';

const Duplicate = () => {
  const objects = useObjects();
  const engine = useEngine();

  const duplicate = async () => {
    if (!objects.editingObject) return;

    const object = await objects.editingObject?.clone();

    // select to edit
    object.edit();

    engine.player.sendSuccessNotification('Object duplicated', 1000);
  };

  useToolbarItemPress(TOOLBAR_DUPLICATE_ID, duplicate);

  useKey('KeyE', duplicate);

  return null;
};

export default Duplicate;
