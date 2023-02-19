import Provider from '@app/components/core/Provider';

import {useKey} from '@verza/sdk/react';
import {useState} from 'react';

import EditorHandler from './components/EditorHandler';

const Editor = () => {
  return (
    <Provider>
      <EditorRender />
    </Provider>
  );
};

const EditorRender = () => {
  const [enabled, setEnabled] = useState(false);

  useKey('KeyR', () => setEnabled(state => !state));

  if (!enabled) return null;

  return <EditorHandler setEnabled={setEnabled} />;
};

export default Editor;
