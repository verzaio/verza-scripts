import {defineReactViteConfig} from '@verza/sdk/config';
import path from 'path';
import svgr from 'vite-plugin-svgr';

import customTsConfig from './tsconfig.plugin';
//import {defineReactViteConfig} from '../verza-sdk/src/config';

const IS_DEV = process.env.NODE_ENV === 'development';

const TS_PATHS = {
  '@app': path.resolve(__dirname, '/src'),

  ...(IS_DEV && {
    '@verza/sdk/utils': path.resolve(__dirname, '../verza-sdk/src/utils'),
    '@verza/sdk/react': path.resolve(
      __dirname,
      '../verza-sdk/src/framework-react',
    ),
    '@verza/sdk/client': path.resolve(__dirname, '../verza-sdk/src/client'),
    '@verza/sdk/config': path.resolve(__dirname, '../verza-sdk/src/config'),
    engine: path.resolve(__dirname, '../verza-sdk/src'),
    '@verza/sdk': path.resolve(__dirname, '../verza-sdk/src'),
  }),
};

export default defineReactViteConfig({
  plugins: [
    svgr(),

    customTsConfig({
      tsConfigPath: IS_DEV ? 'tsconfig.dev.json' : 'tsconfig.prod.json',
    }),
  ],

  resolve: {
    alias: TS_PATHS,
  },
});
