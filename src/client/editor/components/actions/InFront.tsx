import {useKey, useToolbarItemPress} from '@verza/sdk/react';

import {useEditor} from '../EditorProvider';
import {TOOLBAR_IN_FRONT_ID} from '../misc/constants';

const InFront = () => {
  const editor = useEditor();

  const _placeInFront = () => {
    if (!editor.activeObject) return;

    editor.placeInFront(editor.activeObject);
  };

  useToolbarItemPress(TOOLBAR_IN_FRONT_ID, _placeInFront);

  useKey('KeyB', _placeInFront);

  return null;
};

export default InFront;
