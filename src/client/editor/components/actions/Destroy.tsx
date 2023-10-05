import {useEngine, useKey, useToolbarItemPress} from '@verza/sdk/react';

import {useEditor} from '../EditorProvider';
import {TOOLBAR_DESTROY_ID} from '../misc/constants';

const Destroy = () => {
  const editor = useEditor();
  const engine = useEngine();

  const destroy = async () => {
    const object = editor.activeObject;
    if (!object) return;

    editor.destroyObject(object);

    engine.localPlayer.sendErrorNotification('Object destroyed', 1000);
  };

  useToolbarItemPress(TOOLBAR_DESTROY_ID, destroy);

  useKey('KeyX', destroy);

  return null;
};

export default Destroy;
