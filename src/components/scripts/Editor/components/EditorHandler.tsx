import {useEffect} from 'react';

import Destroy from '../actions/Destroy';
import Duplicate from '../actions/Duplicate';
import EntitySelector from '../actions/EntitySelector';
import FreeLook from '../actions/FreeLook';
import Ground from '../actions/Ground';
import InFront from '../actions/InFront';
import Reset from '../actions/Reset';
import {useEditor} from '../EditorProvider';
import EditorFloatingToolbar from './EditorFloatingToolbar';
import EditorPanel from './EditorPanel/EditorPanel';
import {EditorParticles} from './EditorParticles';
import EditorToolbar from './EditorToolbar/EditorToolbar';

import {useControllerProp, useEngine, useEvent} from '@verza/sdk/react';

const EditorHandler = () => {
  const engine = useEngine();

  const editor = useEditor();

  const editing = useControllerProp(editor.controller, 'editing');

  const particles = useControllerProp(editor.controller, 'particlesEditor');

  useEvent('onObjectEdit', editor.onObjectEdit);

  useEffect(() => {
    engine.ui.hideComponent('toolbar_right');

    return () => {
      engine.ui.showComponent('toolbar_right');
    };
  }, [engine]);

  return (
    <>
      <EntitySelector />

      <EditorToolbar />

      <EditorFloatingToolbar />

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

      {particles && <EditorParticles />}
    </>
  );
};

export default EditorHandler;
