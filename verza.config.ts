import {defineConfig} from '@verza/sdk/config';
import path from 'path';
import svgr from 'vite-plugin-svgr';

//import {defineConfig} from '../verza-sdk/src/config';
import customTsConfig from './tsconfig.plugin';

const IS_DEV = process.env.NODE_ENV === 'development';

//const IS_DEV = true;

const TS_PATHS = {
  '@app': path.resolve(__dirname, '/src'),
};

if (IS_DEV) {
  Object.assign(TS_PATHS, {
    '@verza/sdk/utils': path.resolve(__dirname, '../verza-sdk/src/utils'),
    '@verza/sdk/react/client': path.resolve(
      __dirname,
      '../verza-sdk/src/framework-react-client',
    ),
    '@verza/sdk/react': path.resolve(
      __dirname,
      '../verza-sdk/src/framework-react',
    ),
    '@verza/sdk/config': path.resolve(__dirname, '../verza-sdk/src/config'),
    engine: path.resolve(__dirname, '../verza-sdk/src'),
    '@verza/sdk': path.resolve(__dirname, '../verza-sdk/src'),
  });
}

export default defineConfig({
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
