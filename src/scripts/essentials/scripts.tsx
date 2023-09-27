import '@app/styles.scss';

import {DEFAULT_SCRIPT_NAME} from '@app/constants';
import {createReactEngineManager} from '@verza/sdk/react/client';

const render = await createReactEngineManager(import.meta.url, {
  name: DEFAULT_SCRIPT_NAME,
  syncCameraPosition: true,
});

const {Editor} = await import('@app/scripts/editor/components/Editor');
const {FlyMode} = await import('@app/scripts/fly-mode/components/FlyMode');

render(
  <>
    <FlyMode />

    <Editor />
  </>,
);
