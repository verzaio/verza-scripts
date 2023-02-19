import {useEvent, useObjects, useUI, useWorld} from '@verza/sdk/react';
import {useEffect, useState} from 'react';
import EditorToolbar from './EditorToolbar';

export const EDITOR_INTERFACE_ID = 'core_editor';

type EditorHandlerProps = {
  setEnabled: (state: boolean) => void;
};

const EditorHandler = ({setEnabled}: EditorHandlerProps) => {
  const world = useWorld();
  const objects = useObjects();
  const [freeLook, setFreeLook] = useState(false);

  const ui = useUI();
  //const isEditorInterface = useInterface(EDITOR_INTERFACE_ID);

  const exit = () => {
    ui.removeInterface(EDITOR_INTERFACE_ID);
    world.setEntitySelector(false);
    setEnabled(false);
  };

  const toggleFreeLook = (setState?: boolean) => {
    setFreeLook(state => setState ?? !state);
  };

  useEffect(() => {
    world.setEntitySelector(true);

    return () => {
      world.setEntitySelector(false);
      objects.cancelEdit();
    };
  }, [world, objects]);

  useEvent('onEntitySelected', intersects => {
    // only if not same object or null
    if (intersects.object?.entity.id !== objects.editingObject?.id) {
      intersects.object?.entity.edit();
    }
  });

  useEvent('editObject', (_, type) => {
    console.log('editObject', type);
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

  //if (!interfaces.has(EDITOR_INTERFACE_ID)) return null;

  return <EditorToolbar toggleFreeLook={toggleFreeLook} exit={exit} />;
};

export default EditorHandler;
