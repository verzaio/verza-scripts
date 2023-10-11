import {useEditorStore} from './useEditorStore';

export const useEditor = () => {
  return useEditorStore(state => state.editor);
};
