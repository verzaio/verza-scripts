import {Quaternion} from '@verza/sdk';
import {useKey, useObjects, useToolbarItemPress} from '@verza/sdk/react';
import {TOOLBAR_RESET_ID} from '../EditorToolbar';

const Reset = () => {
  const objects = useObjects();

  const reset = async () => {
    if (!objects.editingObject) return;

    const object = objects.editingObject;

    object.setRotationFromWorldSpace(new Quaternion());
  };

  useToolbarItemPress(TOOLBAR_RESET_ID, reset);

  useKey('KeyN', reset);

  return null;
};

export default Reset;
