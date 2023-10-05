import {useCallback, useState} from 'react';

import {CORE_ACTION_EDITOR} from '@verza/sdk';
import {useEngine, useEvent} from '@verza/sdk/react';

import FileContainer from '@app/shared/components/shared/FileContainer/FileContainer';

import {useEditor} from '../EditorProvider';

const FileDrop = () => {
  const editor = useEditor();

  const engine = useEngine();

  const [render, setRender] = useState(false);

  const hide = useCallback(() => {
    engine.ui.setProps({
      zIndex: 100,
    });

    if (!editor.enabled) {
      engine.ui.hide();
    }
  }, [engine, editor]);

  useEvent('onDragEnter', () => {
    if (!engine.localPlayer.hasAccess(CORE_ACTION_EDITOR)) return;

    engine.ui.setProps({
      zIndex: 10000,
    });

    engine.ui.show();

    setRender(true);
  });

  useEvent('onDragLeave', () => {
    setRender(false);

    hide();
  });

  const onDropFiles = useCallback(
    async (files: File[]) => {
      hide();

      setRender(false);

      if (!files.length) return;

      // TODO: Support multiple files upload

      await editor.uploadGltf(files[0]);
    },

    [editor, hide],
  );

  if (!render) return null;

  return (
    <div className="absolute flex h-[50vh] w-[100vw] top-[0px] items-center justify-center">
      <FileContainer onDropFiles={onDropFiles} label="Drop GLB or GLTF Model" />
    </div>
  );
};

export default FileDrop;
