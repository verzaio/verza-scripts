import {useEffect, useMemo} from 'react';

import {CORE_ACTION_EDITOR} from '@verza/sdk';
import {useCommand, useEngine, useKey, useLocalPlayer} from '@verza/sdk/react';

import {MainToolbarItem} from '@app/client/editor-v2/components/MainToolbarItem';
import {Main} from '@app/client/editor-v2/views/Main';

import {useEditorStore} from 'editor/hooks/useEditorStore';
import {EditorManager} from 'editor/managers/editor.manager';

export const Editor = () => {
  const engine = useEngine();
  const player = useLocalPlayer();

  const enabled = useEditorStore(state => state.enabled);

  const editor = useMemo(() => {
    const editor = new EditorManager(engine);

    useEditorStore.getState().setEditor(editor);

    return editor;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [engine, EditorManager.prototype]);

  // expose editor permission
  useCommand(CORE_ACTION_EDITOR);

  // editor activation key
  useKey('KeyR', event => {
    if (event.altKey || event.metaKey) return;

    if (!player.hasAccess(CORE_ACTION_EDITOR)) return;

    useEditorStore.getState().setEnabled(!enabled);
  });

  //

  useEffect(() => {
    if (!enabled) return;

    editor.activate();

    return () => {
      editor.deactivate();
    };
  }, [editor, enabled]);

  return (
    <>
      {player.hasAccess(CORE_ACTION_EDITOR) && <MainToolbarItem />}

      {enabled && <Main />}
    </>
  );
};
