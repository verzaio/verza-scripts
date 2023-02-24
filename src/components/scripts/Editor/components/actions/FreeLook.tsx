import {useKey, usePointer, useToolbarItemPress} from '@verza/sdk/react';
import {TOOLBAR_TOGGLE_FREE_LOOK_ID} from '../EditorToolbar';

type FreeLookProps = {
  toggleFreeLook: (newState?: boolean) => void;
};

const FreeLook = ({toggleFreeLook}: FreeLookProps) => {
  useToolbarItemPress(TOOLBAR_TOGGLE_FREE_LOOK_ID, () => {
    toggleFreeLook();
  });

  useKey('KeyF', () => toggleFreeLook());

  usePointer(() => {
    toggleFreeLook(false);
  });

  return null;
};

export default FreeLook;
