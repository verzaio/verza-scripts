import {createReactEngineManager} from '@verza/sdk/client';

const render = await createReactEngineManager(import.meta.url);

const {Playground} = await import('./Playground');

render(<Playground />);