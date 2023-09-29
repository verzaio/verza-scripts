import {initReactEngine} from '@verza/sdk/react/client';

import {DEFAULT_SCRIPT_NAME} from '@app/constants';

import {FlyMode} from './components/FlyMode';

export default async function script(id: string) {
  const [render] = await initReactEngine({
    id,
    name: DEFAULT_SCRIPT_NAME,
    syncCameraPosition: true,
  });

  render(<FlyMode />);
}
