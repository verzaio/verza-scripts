import {useEditor} from '../../EditorProvider';
import EditorPanelObject from './EditorPanelObject';
import EditorPanelSettings from './EditorPanelSettings';
import EditorWidget from './EditorWidget/EditorWidget';

import {useControllerProp} from '@verza/sdk/react';

const EditorPanel = () => {
  const editor = useEditor();

  const editing = useControllerProp(editor.controller, 'editing');

  return (
    <>
      <EditorWidget />

      <EditorPanelSettings />

      {editing && (
        <>
          <EditorPanelObject />
        </>
      )}
    </>
  );
};

export default EditorPanel;
