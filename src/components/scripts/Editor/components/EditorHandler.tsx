import {useEvent, useObjects, useUI, useWorld} from '@verza/sdk/react';
import {useCallback, useEffect, useRef, useState} from 'react';
import EditorPanel from './EditorPanel/EditorPanel';
import Ground from './actions/Ground';
import InFront from './actions/InFront';
import Reset from './actions/Reset';
import EditorToolbar, {TOOLBAR_TOGGLE_FREE_LOOK_ID} from './EditorToolbar';
import Destroy from './actions/Destroy';
import Duplicate from './actions/Duplicate';
import FileDrop from './actions/FileDrop/FileDrop';
import {ObjectManager} from '@verza/sdk';
import FreeLook from './actions/FreeLook';

const isUneditable = async (object: ObjectManager): Promise<boolean> => {
  if (!object) return false;

  if (object.userData.uneditable) {
    return true;
  }

  return isUneditable((await object.resolveParent())!);
};

type EditorHandlerProps = {
  setEnabled: (state: boolean) => void;
};

const EditorHandler = ({setEnabled}: EditorHandlerProps) => {
  const world = useWorld();
  const objects = useObjects();

  const [editing, setEditing] = useState(false);

  const ui = useUI();

  const setCursor = useCallback(
    (status: boolean) => {
      if (status) {
        ui.addInterface(TOOLBAR_TOGGLE_FREE_LOOK_ID);
      } else {
        ui.removeInterface(TOOLBAR_TOGGLE_FREE_LOOK_ID);
      }
    },
    [ui],
  );

  const exit = () => {
    ui.hideCursor();
    world.setEntitySelector(false);
    setEnabled(false);
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
      if (await isUneditable(object)) {
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

  const initialRenderRef = useRef(false);

  // handle interface removal
  useEffect(() => {
    if (!initialRenderRef.current) {
      initialRenderRef.current = true;
      setCursor(true);
    }

    return () => {
      initialRenderRef.current = false;
      setCursor(false);
    };
  }, [ui, setCursor]);

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

      <EditorToolbar editing={editing} exit={exit} />

      <FileDrop />

      <FreeLook setCursor={setCursor} />
    </>
  );
};

export default EditorHandler;
