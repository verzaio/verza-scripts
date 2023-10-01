import {createPlugin} from 'leva/plugin';

import {FileComponent} from './File';
import * as props from './file-plugin';

export * from '.';

const file = createPlugin({
  component: FileComponent,
  ...props,
});

export default file;
