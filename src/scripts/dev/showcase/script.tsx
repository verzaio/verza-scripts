import {createReactEngineManager} from '@verza/sdk/client';

const render = await createReactEngineManager(import.meta.url);

const {Showcase} = await import('./Showcase');

render(<Showcase />);
