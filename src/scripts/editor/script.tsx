import '@app/styles.scss';

import {createReactEngineManager} from '@verza/sdk/client';

const render = await createReactEngineManager(import.meta.url);

const {Editor} = await import('./components/Editor');

render(<Editor />);
