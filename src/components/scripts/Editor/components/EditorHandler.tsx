import {useEvent, useObjects, useUI, useWorld} from '@verza/sdk/react';
import {useEffect, useRef, useState} from 'react';
import Coordinates from './actions/Coordinates/Coordinates';
import FreeLook from './actions/FreeLook';
import Ground from './actions/Ground';
import InFront from './actions/InFront';
import Reset from './actions/Reset';
import EditorToolbar from './EditorToolbar';

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

    // edit if not selected
    if (intersects.object.entity.id !== objects.editingObject?.id) {
      intersects.object.entity.edit();
    }
  });

  useEvent('onObjectEdit', (_, type) => {
    //console.log(`onObjectEdit:${type}`);

    switch (type) {
      case 'start': {
        updatingRef.current = true;
        break;
      }
      case 'end': {
        /* console.log(
          'end',
          _.position.toArray().map(e => e.toFixed(2)),
        ); */
        updatingRef.current = false;
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

  useEffect(() => {
    if (!editing) return;

    ui.setSize({
      width: '100%',
      height: '50%',
    });
    ui.show();

    return () => {
      return ui.hide();
    };
  }, [ui, editing]);

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

          <Reset />

          <InFront />

          <Coordinates />
        </>
      )}

      <FreeLook toggleFreeLook={toggleFreeLook} />

      <EditorToolbar editing={editing} exit={exit} />
    </>
  );
};

export default EditorHandler;
