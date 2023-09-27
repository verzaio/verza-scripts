import '@app/styles.scss';

import {DEFAULT_SCRIPT_NAME} from '@app/constants';
import {createReactEngineManager} from '@verza/sdk/react/client';

const render = await createReactEngineManager(import.meta.url, {
  name: DEFAULT_SCRIPT_NAME,
});

const {Editor} = await import('./components/Editor');

render(<Editor />);
