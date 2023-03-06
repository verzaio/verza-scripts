import {useEvent, useObjects, useUI, useWorld} from '@verza/sdk/react';
import {useEffect, useRef, useState} from 'react';
import EditorPanel from './EditorPanel/EditorPanel';
import FreeLook from './actions/FreeLook';
import Ground from './actions/Ground';
import InFront from './actions/InFront';
import Reset from './actions/Reset';
import EditorToolbar from './EditorToolbar';
import Destroy from './actions/Destroy';
import Duplicate from './actions/Duplicate';
import FileDrop from './actions/FileDrop';

export const EDITOR_INTERFACE_ID = 'core_editor';

type EditorHandlerProps = {
  setEnabled: (state: boolean) => void;
};

const EditorHandler = ({setEnabled}: EditorHandlerProps) => {
  const world = useWorld();
  const objects = useObjects();

  const [freeLook, setFreeLook] = useState(false);
  const [editing, setEditing] = useState(false);

  const ui = useUI();

  const exit = () => {
    ui.removeInterface(EDITOR_INTERFACE_ID);
    world.setEntitySelector(false);
    setEnabled(false);
  };

  const toggleFreeLook = (newStatus?: boolean) => {
    setFreeLook(state => newStatus ?? !state);
  };

  useEffect(() => {
    world.setEntitySelector(true);

    // set initial config
    objects.setEditSnaps(null, null, null);

    objects.setEditAxes({
      showX: true,
      showY: true,
      showZ: true,

      showRX: false,
      showRY: true,
      showRZ: false,

      showSX: false,
      showSY: false,
      showSZ: false,
    });

    return () => {
      world.setEntitySelector(false);
      objects.cancelEdit();
    };
  }, [world, objects]);

  const updatingRef = useRef(false);
  useEvent('onEntitySelected', async intersects => {
    // cancel if no object was selected
    if (!intersects.object) {
      objects.cancelEdit();
      return;
    }

    const object = intersects.object.entity;

    // edit if not selected
    if (object.id !== objects.editingObject?.id) {
      if (object.userData.uneditable) {
        objects.cancelEdit();
        return;
      }

      object.edit();
    }
  });

  useEvent('onObjectEdit', (object, type) => {
    switch (type) {
      case 'start': {
        updatingRef.current = true;
        break;
      }
      case 'end': {
        updatingRef.current = false;

        //console.log('END', object.permanent);

        object.sync();

        if (object.permanent) {
          object.saveVolatile();
        }
        break;
      }
      case 'update': {
        //console.log('UPDATE', object.permanent);

        object.sync();
        break;
      }
      case 'select': {
        setEditing(true);
        updatingRef.current = false;
        break;
      }
      case 'unselect': {
        setEditing(false);
        break;
      }
    }
  });

  useEffect(() => {
    if (freeLook) return;

    ui.addInterface(EDITOR_INTERFACE_ID);

    return () => {
      ui.removeInterface(EDITOR_INTERFACE_ID);
    };
  }, [ui, freeLook]);

  // handle interface removal
  useEffect(() => {
    return () => {
      ui.removeInterface(EDITOR_INTERFACE_ID);
    };
  }, [ui]);

  return (
    <>
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

      <FreeLook toggleFreeLook={toggleFreeLook} />

      <EditorToolbar editing={editing} exit={exit} />

      <FileDrop />
    </>
  );
};

export default EditorHandler;
