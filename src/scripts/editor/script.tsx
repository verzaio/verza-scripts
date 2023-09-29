import '@app/styles.scss';

import {initReactEngine} from '@verza/sdk/react/client';

import {DEFAULT_SCRIPT_NAME} from '@app/constants';

import {Editor} from './components/Editor';

export default async function script(id: string) {
  const [render] = await initReactEngine({
    id,
    name: DEFAULT_SCRIPT_NAME,
  });

  render(<Editor />);
}
