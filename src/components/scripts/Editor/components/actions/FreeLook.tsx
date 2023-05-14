import {useKey, usePointer, useToolbarItemPress, useUI} from '@verza/sdk/react';
import {TOOLBAR_TOGGLE_FREE_LOOK_ID} from '../../misc/constants';

const FreeLook = () => {
  const ui = useUI();

  const freeLook = () => ui.toggleInterface(TOOLBAR_TOGGLE_FREE_LOOK_ID);

  useToolbarItemPress(TOOLBAR_TOGGLE_FREE_LOOK_ID, freeLook);

  useKey('KeyF', freeLook);

  usePointer(() => {
    if (!ui.hasInterface(TOOLBAR_TOGGLE_FREE_LOOK_ID)) {
      ui.addInterface(TOOLBAR_TOGGLE_FREE_LOOK_ID);
    }
  });

  return null;
};

export default FreeLook;
