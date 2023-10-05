import {useEffect, useState} from 'react';

import {useControllerProp} from '@verza/sdk/react';

import {useEditor} from '../../EditorProvider';
import EditorPanelObject from './EditorPanelObject';
import EditorPanelSettings from './EditorPanelSettings';
import EditorWidget from './EditorWidget/EditorWidget';

const EditorPanel = () => {
  const editor = useEditor();

  const [render, setRender] = useState(false);

  useControllerProp(editor.controller, 'editing');

  useEffect(() => {
    setTimeout(() => {
      setRender(true);
    }, 100);
  }, []);

  return (
    <>
      <EditorWidget />

      <EditorPanelSettings />

      {render && <EditorPanelObject />}
    </>
  );
};

export default EditorPanel;
