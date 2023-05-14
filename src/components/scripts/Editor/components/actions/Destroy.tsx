import {
  useEngine,
  useKey,
  useObjects,
  useToolbarItemPress,
} from '@verza/sdk/react';
import {TOOLBAR_DESTROY_ID} from '../../misc/constants';

const Destroy = () => {
  const objects = useObjects();
  const engine = useEngine();

  const destroy = async () => {
    const object = objects.editingObject;
    if (!object) return;

    if (!object.remote) {
      object.destroy();
    } else {
      const parent = object.parent;

      // hide object
      object.setVisible(false);

      // if parent, then destroy child and keep parent
      if (parent) {
        object.destroy();
        parent.save();
      } else {
        // if not, then just delete it
        object.delete();
      }
    }

    engine.localPlayer.sendErrorNotification('Object destroyed', 1000);
  };

  useToolbarItemPress(TOOLBAR_DESTROY_ID, destroy);

  useKey('KeyX', destroy);

  return null;
};

export default Destroy;
