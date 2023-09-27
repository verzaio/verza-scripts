import {createReactEngineManager} from '@verza/sdk/client';

const render = await createReactEngineManager(import.meta.url, {
  syncCameraPosition: true,
});

const {FlyMode} = await import('./components/FlyMode');

render(<FlyMode />);
