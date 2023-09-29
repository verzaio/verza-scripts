import {initReactEngine} from '@verza/sdk/react/client';

import {Playground} from './Playground';

export default async function script(id: string) {
  const [render] = await initReactEngine(id);

  render(<Playground />);
}
