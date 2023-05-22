import ToolbarButton from '../ToolbarButton/ToolbarButton';
import RedoIcon from './res/redo-icon.svg';
import UndoIcon from './res/undo-icon.svg';

import {useEditor} from '@app/components/scripts/Editor/EditorProvider';
import {useControllerProp, useKey} from '@verza/sdk/react';

const HistoryButton = () => {
  const editor = useEditor();

  // watch history
  useControllerProp(editor.history.controller, 'currentIndex');

  useKey(
    'KeyZ',
    event => {
      if (!event.ctrlKey && !event.metaKey) return;

      if (!event.shiftKey) {
        if (editor.history.canUndo) {
          editor.history.undo();
        }
      } else {
        if (editor.history.canRedo) {
          editor.history.redo();
        }
      }
    },
    {
      event: 'keydown',
    },
  );

  return (
    <>
      <ToolbarButton
        onClick={() => editor.history.undo()}
        disabled={!editor.history.canUndo}>
        <UndoIcon />
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.history.redo()}
        disabled={!editor.history.canRedo}>
        <RedoIcon />
      </ToolbarButton>

      {/* <ToolbarButton
        onClick={() => editor.history.clear()}
        disabled={!editor.history.stack.length}>
        Clear
      </ToolbarButton> */}
    </>
  );
};

export default HistoryButton;
