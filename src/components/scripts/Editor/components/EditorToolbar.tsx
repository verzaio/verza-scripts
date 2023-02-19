import {ToolbarElement} from '@verza/sdk/dist/definitions/types/ui.types';
import {
  useEvent,
  useKey,
  useObjects,
  useToolbar,
  useToolbarItemPress,
} from '@verza/sdk/react';
import {useRef} from 'react';

const TOOLBAR_ID = 'editor_toolbar';

const TOOLBAR_SWITCH_POS_ROT_ID = 'editor_toggle_pos_rot';

const TOOLBAR_TOGGLE_FREE_LOOK_ID = 'editor_free_look';

const TOOLBAR_GRAB_ID = 'editor_grab';

const TOOLBAR_EXIT_ID = 'editor_exit';

const TOOLBAR_ACTIONS: ToolbarElement = {
  id: TOOLBAR_ID,
  position: 'bottom',
  items: [
    {
      id: TOOLBAR_SWITCH_POS_ROT_ID,
      name: 'Switch Pos / Rot',
      key: 'E',
    },
    {
      id: TOOLBAR_GRAB_ID,
      name: 'Grab',
      key: 'G',
    },
    {
      id: TOOLBAR_TOGGLE_FREE_LOOK_ID,
      name: 'Free Look',
      key: 'F',
    },
    {
      id: TOOLBAR_EXIT_ID,
      name: 'Exit',
      key: 'R',
    },
  ],
};
type EditorToolbarProps = {
  exit: () => void;
  toggleFreeLook: (newState?: boolean) => void;
};

const EditorToolbar = ({exit, toggleFreeLook}: EditorToolbarProps) => {
  const objects = useObjects();

  const togglePosRot = () => {
    objects.setEditMode(
      objects.objectMode === 'position' ? 'rotation' : 'position',
    );
  };

  // add toolbar
  useToolbar(TOOLBAR_ACTIONS);

  // toggle pos/rot
  useKey('KeyE', togglePosRot);
  useToolbarItemPress(TOOLBAR_SWITCH_POS_ROT_ID, () => togglePosRot());

  // exit
  useToolbarItemPress(TOOLBAR_EXIT_ID, exit);

  // free look
  const isHoldingRef = useRef(false);
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

  useToolbarItemPress(TOOLBAR_TOGGLE_FREE_LOOK_ID, () => toggleFreeLook());

  return null;
};

export default EditorToolbar;
