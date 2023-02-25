import {
  useEngine,
  useKey,
  useObjects,
  useToolbarItemPress,
} from '@verza/sdk/react';
import {TOOLBAR_DESTROY_ID} from '../EditorToolbar';

const Destroy = () => {
  const objects = useObjects();
  const engine = useEngine();

  const destroy = async () => {
    objects.editingObject?.destroy();

    engine.player.sendErrorNotification('Object destroyed', 1000);
  };

  useToolbarItemPress(TOOLBAR_DESTROY_ID, destroy);

  useKey('KeyX', destroy);

  return null;
};

export default Destroy;
