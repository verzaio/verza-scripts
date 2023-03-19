import {useKey, useToolbarItemPress, useUI} from '@verza/sdk/react';
import {TOOLBAR_TOGGLE_FREE_LOOK_ID} from '../EditorToolbar';

const FreeLook = () => {
  const ui = useUI();

  const freeLook = () => ui.toggleCursor();

  useToolbarItemPress(TOOLBAR_TOGGLE_FREE_LOOK_ID, freeLook);

  useKey('KeyG', freeLook);

  return null;
};

export default FreeLook;
