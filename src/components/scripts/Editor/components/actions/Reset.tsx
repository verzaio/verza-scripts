import {Quaternion, Vector3} from '@verza/sdk';
import {useKey, useObjects, useToolbarItemPress} from '@verza/sdk/react';
import {TOOLBAR_RESET_ID} from '../../misc/constants';

const Reset = () => {
  const objects = useObjects();

  const reset = async () => {
    if (!objects.editingObject) return;

    const object = objects.editingObject;

    object.setRotationFromWorldSpace(new Quaternion());
    object.setScale(new Vector3(1, 1, 1));
  };

  useToolbarItemPress(TOOLBAR_RESET_ID, reset);

  useKey('KeyN', reset);

  return null;
};

export default Reset;
