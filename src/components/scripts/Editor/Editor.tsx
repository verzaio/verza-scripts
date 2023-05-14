import Provider from '@app/components/core/Provider';
import {CORE_ACTION_EDITOR} from '@verza/sdk';

import {
  useCommand,
  useControllerProp,
  useKey,
  useLocalPlayer,
  useMainToolbarItem,
} from '@verza/sdk/react';

import EditorHandler from './components/EditorHandler';
import FileDrop from './components/actions/FileDrop/FileDrop';
import EditorProvider, {useEditor} from './EditorProvider';

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

  useMainToolbarItem({
    id: 'editor',
    name: 'Map Editor',
    key: 'R',
  });

  useKey('KeyR', event => {
    if (event.altKey || event.metaKey) return;

    if (!player.hasAccess(CORE_ACTION_EDITOR)) return;

    editor.enabled = !editor.enabled;
  });

  return (
    <>
      <FileDrop />

      {enabled && <EditorHandler />}
    </>
  );
};

export default Editor;
