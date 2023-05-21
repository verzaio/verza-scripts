import {useEffect, useState} from 'react';

import {useEditor} from '../../EditorProvider';
import EditorPanelObject from './EditorPanelObject';
import EditorPanelSettings from './EditorPanelSettings';
import EditorWidget from './EditorWidget/EditorWidget';

import {useControllerProp} from '@verza/sdk/react';

const EditorPanel = () => {
  const editor = useEditor();

  const editing = useControllerProp(editor.controller, 'editing');

  const [render, setRender] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setRender(true);
    }, 100);
  }, []);

  return (
    <>
      <EditorWidget editing={editing} />

      <EditorPanelSettings />

      {render && <EditorPanelObject />}

      {/* {editing && (
        <>
          <EditorPanelObject />
        </>
      )} */}
    </>
  );
};

export default EditorPanel;
