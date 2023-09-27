import {ReactNode, createContext, useContext, useMemo} from 'react';

import {useEngine} from '@verza/sdk/react';

import EditorManager from './managers/editor.manager';

const EditorContext = createContext<EditorManager>(null!);

type EditorProviderProps = {
  children: ReactNode;
};

const EditorProvider = ({children}: EditorProviderProps) => {
  const engine = useEngine();

  const editor = useMemo(
    () => new EditorManager(engine),
    // force hot reload to re-create editor
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [EditorManager.prototype],
  );

  return (
    <EditorContext.Provider value={editor}>{children}</EditorContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useEditor = () => {
  return useContext(EditorContext);
};

export default EditorProvider;
