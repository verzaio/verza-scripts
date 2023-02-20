import {ToolbarElement} from '@verza/sdk/dist/definitions/types/ui.types';
import {
  useKey,
  useObjects,
  useToolbar,
  useToolbarItemPress,
} from '@verza/sdk/react';

const TOOLBAR_ID = 'editor_toolbar';

const TOOLBAR_SWITCH_POS_ROT_ID = 'editor_toggle_pos_rot';

export const TOOLBAR_TOGGLE_FREE_LOOK_ID = 'editor_free_look';

export const TOOLBAR_GROUND_ID = 'editor_ground';

export const TOOLBAR_IN_FRONT_ID = 'editor_in_front';

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
      id: TOOLBAR_GROUND_ID,
      name: 'Ground',
      key: 'G',
    },
    {
      id: TOOLBAR_IN_FRONT_ID,
      name: 'In Front',
      key: 'B',
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

const EditorToolbar = ({exit}: EditorToolbarProps) => {
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

  return null;
};

export default EditorToolbar;
