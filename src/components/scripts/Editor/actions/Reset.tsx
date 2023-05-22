import {useEditor} from '../EditorProvider';
import {TOOLBAR_RESET_ID} from '../misc/constants';

import {useKey, useToolbarItemPress} from '@verza/sdk/react';

const Reset = () => {
  const editor = useEditor();

  const reset = async () => {
    if (!editor.activeObject) return;

    editor.setRotation([0, 0, 0, 1]);
    editor.setScale([1, 1, 1]);
  };

  useToolbarItemPress(TOOLBAR_RESET_ID, reset);

  useKey('KeyN', reset);

  return null;
};

export default Reset;
