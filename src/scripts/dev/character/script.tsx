import '@app/styles.scss';

import {createReactEngineManager} from '@verza/sdk/client';

const render = await createReactEngineManager(import.meta.url);

const {Character} = await import('./Character');

render(<Character />);
