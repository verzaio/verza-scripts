import {createReactEngineManager} from '@verza/sdk/react/client';

const render = await createReactEngineManager(import.meta.url, {
  syncCameraPosition: true,
});

const {Time} = await import('./Time');

render(<Time />);
