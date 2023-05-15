import {useEffect} from 'react';

import {useEditor} from '../EditorProvider';
import Destroy from './actions/Destroy';
import Duplicate from './actions/Duplicate';
import EntitySelector from './actions/EntitySelector';
import FreeLook from './actions/FreeLook';
import Ground from './actions/Ground';
import InFront from './actions/InFront';
import Reset from './actions/Reset';
import EditorPanel from './EditorPanel/EditorPanel';
import EditorToolbar from './EditorToolbar';

import {useControllerProp, useEngine, useEvent} from '@verza/sdk/react';

const EditorHandler = () => {
  const engine = useEngine();

  const editor = useEditor();

  const editing = useControllerProp(editor.controller, 'editing');

  useEvent('onObjectEdit', editor.onObjectEdit);

  useEffect(() => {
    if (!editing) return;

    engine.ui.hideComponent('toolbar_right');

    return () => {
      engine.ui.showComponent('toolbar_right');
    };
  }, [engine, editing]);

  return (
    <>
      <EntitySelector />

      <EditorToolbar />

      <EditorPanel />

      <FreeLook />

      {editing && (
        <>
          <Ground />

          <InFront />

          <Duplicate />

          <Destroy />

          <Reset />
        </>
      )}
    </>
  );
};

export default EditorHandler;
