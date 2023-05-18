import {useEditor} from '../EditorProvider';
import {TOOLBAR_RESET_ID} from '../misc/constants';

import {Quaternion, Vector3} from '@verza/sdk';
import {useKey, useToolbarItemPress} from '@verza/sdk/react';

const Reset = () => {
  const editor = useEditor();

  const reset = async () => {
    if (!editor.activeObject) return;

    const object = editor.activeObject;

    object.setRotationFromWorldSpace(new Quaternion());
    object.setScale(new Vector3(1, 1, 1));
  };

  useToolbarItemPress(TOOLBAR_RESET_ID, reset);

  useKey('KeyN', reset);

  return null;
};

export default Reset;
