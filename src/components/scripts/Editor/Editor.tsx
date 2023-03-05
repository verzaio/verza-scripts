import Provider from '@app/components/core/Provider';
import {CORE_ACTION_EDITOR} from '@verza/sdk';

import {useCommand, useKey, useLocalPlayer, useObjects} from '@verza/sdk/react';

import {useEffect, useState} from 'react';

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

  const objects = useObjects();
  useEffect(() => {
    /* const object = objects.createBox(
      {
        w: 1,
        h: 1,
        d: 1,
        color: 'purple',
      },
      {
        id: OBJECT_ID,
        position: [2, 2, 2],
      },
    );

    object.save(); */

    async () => {
      //OBJECT_ID
    };

    return () => {
      //object.delete();
    };
  }, [objects]);

  useKey('KeyR', event => {
    if (event.altKey || event.metaKey) return;

    if (!player.hasAccess(CORE_ACTION_EDITOR)) return;

    setEnabled(state => !state);
  });

  if (!enabled) return null;

  return <EditorHandler setEnabled={setEnabled} />;
};

export default Editor;
