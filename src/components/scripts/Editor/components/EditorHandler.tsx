import {useControllerProp, useEvent} from '@verza/sdk/react';
import EditorPanel from './EditorPanel';
import Ground from './actions/Ground';
import InFront from './actions/InFront';
import Reset from './actions/Reset';
import EditorToolbar from './EditorToolbar';
import Destroy from './actions/Destroy';
import Duplicate from './actions/Duplicate';
import {ObjectManager} from '@verza/sdk';
import FreeLook from './actions/FreeLook';
import EntitySelector from './actions/EntitySelector';
import {useEditor} from '../EditorProvider';

export const isUneditable = async (object: ObjectManager): Promise<boolean> => {
  if (!object) return false;

  if (object.userData.uneditable) {
    return true;
  }

  return isUneditable((await object.resolveParent())!);
};

const EditorHandler = () => {
  const editor = useEditor();

  const editing = useControllerProp(editor.controller, 'editing');

  useEvent('onObjectEdit', editor.onObjectEdit);

  return (
    <>
      <EntitySelector />

      {editing && (
        <>
          <Ground />

          <InFront />

          <Duplicate />

          <Destroy />

          <Reset />

          <EditorPanel />
        </>
      )}

      <EditorToolbar />

      <FreeLook />
    </>
  );
};

export default EditorHandler;
