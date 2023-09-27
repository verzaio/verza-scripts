import {createReactEngineManager} from '@verza/sdk/react/client';

const render = await createReactEngineManager(import.meta.url);

const {Showcase} = await import('./Showcase');

render(<Showcase />);
