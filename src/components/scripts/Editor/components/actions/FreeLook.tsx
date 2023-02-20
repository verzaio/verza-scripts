import {useEvent, useKey, useToolbarItemPress} from '@verza/sdk/react';
import {useRef} from 'react';
import {TOOLBAR_TOGGLE_FREE_LOOK_ID} from '../EditorToolbar';

type FreeLookProps = {
  toggleFreeLook: (newState?: boolean) => void;
};

const FreeLook = ({toggleFreeLook}: FreeLookProps) => {
  // free look
  const isHoldingRef = useRef(false);

  useToolbarItemPress(TOOLBAR_TOGGLE_FREE_LOOK_ID, () => {
    toggleFreeLook();
  });

  useKey(
    'KeyF',
    () => {
      if (isHoldingRef.current) return;

      isHoldingRef.current = true;
      toggleFreeLook(true);
    },
    {
      event: 'keydown',
    },
  );

  useKey(
    'KeyF',
    () => {
      isHoldingRef.current = false;
      toggleFreeLook(false);
    },
    {
      event: 'keyup',
      ignoreFlags: true,
    },
  );

  useEvent('onPointerUp', () => {
    isHoldingRef.current = false;

    toggleFreeLook(false);
  });

  return null;
};

export default FreeLook;
