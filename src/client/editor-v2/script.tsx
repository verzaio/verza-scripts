import '@app/styles.css';

import {initReactEngine} from '@verza/sdk/react/client';

import {DEFAULT_SCRIPT_NAME} from '@app/shared/constants';

import {Editor} from './Editor';

export default async function script(id: string) {
  const [render] = await initReactEngine({
    id,
    name: DEFAULT_SCRIPT_NAME,
  });

  render(<Editor />);
}
