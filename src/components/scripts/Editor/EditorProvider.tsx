import React, {ReactNode, createContext, useContext, useState} from 'react';

import EditorManager from './managers/editor-manager';

import {useEngine} from '@verza/sdk/react';

const EditorContext = createContext<EditorManager>(null!);

type EditorProviderProps = {
  children: ReactNode;
};

const EditorProvider = ({children}: EditorProviderProps) => {
  const engine = useEngine();

  const [editor] = useState(() => new EditorManager(engine));

  return (
    <EditorContext.Provider value={editor}>{children}</EditorContext.Provider>
  );
};

export const useEditor = () => {
  return useContext(EditorContext);
};

export default EditorProvider;
