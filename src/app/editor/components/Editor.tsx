import FileDrop from './actions/FileDrop/FileDrop';
import EditorHandler from './components/EditorHandler';
import EditorProvider, {useEditor} from './EditorProvider';

import Provider from '@app/components/core/Provider';
import {CORE_ACTION_EDITOR} from '@verza/sdk';
import {
  useCommand,
  useControllerProp,
  useKey,
  useLocalPlayer,
  useMainToolbarItem,
} from '@verza/sdk/react';

const Editor = () => {
  return (
    <Provider>
      <EditorProvider>
        <EditorRender />
      </EditorProvider>
    </Provider>
  );
};

const EditorRender = () => {
  const editor = useEditor();

  const player = useLocalPlayer();

  const enabled = useControllerProp(editor.controller, 'enabled');

  // expose editor permission
  useCommand(CORE_ACTION_EDITOR);

  useKey('KeyR', event => {
    if (event.altKey || event.metaKey) return;

    if (!player.hasAccess(CORE_ACTION_EDITOR)) return;

    editor.enabled = !editor.enabled;
  });

  return (
    <>
      <FileDrop />

      {player.hasAccess(CORE_ACTION_EDITOR) && <MainToolbarItem />}

      {enabled && <EditorHandler />}
    </>
  );
};

const MainToolbarItem = () => {
  useMainToolbarItem({
    id: 'editor',
    name: 'Map Editor',
    key: 'R',
  });

  return null;
};

export default Editor;