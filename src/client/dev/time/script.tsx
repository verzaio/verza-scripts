import {initReactEngine} from '@verza/sdk/react/client';

import {Time} from './Time';

export default async function script(id: string) {
  const [render] = await initReactEngine({
    id,
    syncCameraPosition: true,
  });

  render(<Time />);
}
