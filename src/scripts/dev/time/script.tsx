import {createReactEngineManager} from '@verza/sdk/client';

const render = await createReactEngineManager(import.meta.url, {
  syncCameraPosition: true,
});

const {Time} = await import('./Time');

render(<Time />);
