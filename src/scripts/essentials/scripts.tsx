import '@app/styles.scss';

import {createReactEngineManager} from '@verza/sdk/client';

const render = await createReactEngineManager(import.meta.url, {
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
