import {useEditor} from '../EditorProvider';
import {
  TOOLBAR_DESTROY_ID,
  TOOLBAR_DUPLICATE_ID,
  TOOLBAR_GROUND_ID,
  TOOLBAR_IN_FRONT_ID,
  TOOLBAR_RESET_ID,
  TOOLBAR_TOGGLE_FREE_LOOK_ID,
} from '../misc/constants';

import {ToolbarItem} from '@verza/sdk';
import {ToolbarElement} from '@verza/sdk/dist/definitions/types/ui.types';
import {useToolbar, useToolbarItemPress} from '@verza/sdk/react';

const TOOLBAR_ID = 'editor_toolbar';

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

const EditorFloatingToolbar = () => {
  const editor = useEditor();

  // add toolbar
  useToolbar({
    ...TOOLBAR_ACTIONS,

    items: [
      ...(editor.editing ? [...TOOLBAR_EDIT_ACTIONS] : []),
      ...TOOLBAR_ACTIONS.items,
    ],
  });

  // exit
  useToolbarItemPress(TOOLBAR_EXIT_ID, () => (editor.enabled = false));

  return null;
};

export default EditorFloatingToolbar;
