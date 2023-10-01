import {useKey, useToolbarItemPress} from '@verza/sdk/react';

import {useEditor} from '../EditorProvider';
import {TOOLBAR_GROUND_ID} from '../misc/constants';

const Ground = () => {
  const editor = useEditor();

  const _placeOnGround = () => {
    if (!editor.activeObject) return;

    editor.placeOnGround(editor.activeObject);
  };

  useToolbarItemPress(TOOLBAR_GROUND_ID, _placeOnGround);

  useKey('KeyG', _placeOnGround);

  return null;
};

export default Ground;
