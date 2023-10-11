import {create} from 'zustand';

import {EditorManager} from 'editor/managers/editor.manager';

type EditorStoreState = {
  enabled: boolean;
  setEnabled: (enabled: boolean) => void;

  editor: EditorManager;
  setEditor: (editor: EditorManager) => void;
};

export const useEditorStore = create<EditorStoreState>(set => ({
  editor: null!,
  setEditor: (editor: EditorManager) => set({editor}),

  enabled: false,
  setEnabled: (enabled: boolean) => set({enabled}),
}));
