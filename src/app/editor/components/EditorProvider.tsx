import React, {ReactNode, createContext, useContext, useMemo} from 'react';

import EditorManager from './managers/editor.manager';

import {useEngine} from '@verza/sdk/react';

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

export const useEditor = () => {
  return useContext(EditorContext);
};

export default EditorProvider;
