import {TOOLBAR_TOGGLE_FREE_LOOK_ID} from '../misc/constants';

import {
  useEngine,
  useKey,
  usePointer,
  useToolbarItemPress,
} from '@verza/sdk/react';

const FreeLook = () => {
  const {ui} = useEngine();

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
