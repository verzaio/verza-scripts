import {ToolbarItem} from '@verza/sdk';
import {ToolbarElement} from '@verza/sdk/dist/definitions/types/ui.types';
import {useToolbar, useToolbarItemPress} from '@verza/sdk/react';

const TOOLBAR_ID = 'editor_toolbar';

export const TOOLBAR_TOGGLE_FREE_LOOK_ID = 'editor_free_look';

export const TOOLBAR_GROUND_ID = 'editor_ground';

export const TOOLBAR_IN_FRONT_ID = 'editor_in_front';

export const TOOLBAR_RESET_ID = 'editor_reset';

export const TOOLBAR_DUPLICATE_ID = 'editor_duplicate';

export const TOOLBAR_DESTROY_ID = 'editor_destroy';

const TOOLBAR_EXIT_ID = 'editor_exit';

export const TOOLBAR_EDIT_ACTIONS: ToolbarItem[] = [
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
    id: TOOLBAR_RESET_ID,
    name: 'Reset',
    key: 'N',
  },
  {
    id: TOOLBAR_DUPLICATE_ID,
    name: 'Duplicate',
    key: 'E',
  },
  {
    id: TOOLBAR_DESTROY_ID,
    name: 'Destroy',
    key: 'X',
  },
];

const TOOLBAR_ACTIONS: ToolbarElement = {
  id: TOOLBAR_ID,
  position: 'bottom',
  items: [
    {
      id: TOOLBAR_TOGGLE_FREE_LOOK_ID,
      name: 'Free Look',
      key: 'F',
    },

    {
      id: TOOLBAR_EXIT_ID,
      name: 'Exit Editor',
      key: 'R',
    },
  ],
};

type EditorToolbarProps = {
  editing: boolean;
  exit: () => void;
};

const EditorToolbar = ({exit, editing}: EditorToolbarProps) => {
  // add toolbar
  useToolbar({
    ...TOOLBAR_ACTIONS,

    items: [
      ...(editing ? [...TOOLBAR_EDIT_ACTIONS] : []),
      ...TOOLBAR_ACTIONS.items,
    ],
  });

  // exit
  useToolbarItemPress(TOOLBAR_EXIT_ID, exit);

  return null;
};

export default EditorToolbar;
