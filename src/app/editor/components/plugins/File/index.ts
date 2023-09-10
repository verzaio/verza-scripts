import {FileComponent} from './File';
import * as props from './file-plugin';

import {createPlugin} from 'leva/plugin';

export * from '.';

const file = createPlugin({
  component: FileComponent,
  ...props,
});

export default file;
