import Provider from '@app/components/core/Provider';
import {CORE_ACTION_EDITOR} from '@verza/sdk';

import {
  useCommand,
  useKey,
  useLocalPlayer,
  useMainToolbarItem,
} from '@verza/sdk/react';

import {useState} from 'react';

import EditorHandler from './components/EditorHandler';

const Editor = () => {
  return (
    <Provider>
      <EditorRender />
    </Provider>
  );
};

//const OBJECT_ID = '145bb3da-ae85-4fbb-9c3a-0e8e17f882f8';

const EditorRender = () => {
  const [enabled, setEnabled] = useState(false);

  const player = useLocalPlayer();

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

    setEnabled(state => !state);
  });

  if (!enabled) return null;

  return <EditorHandler setEnabled={setEnabled} />;
};

export default Editor;
