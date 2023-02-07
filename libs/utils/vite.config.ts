import { mergeConfig } from 'vite';

import viteTsConfigPaths from 'vite-tsconfig-paths';

import config from '../../vite.config';

export default mergeConfig(config, {
  plugins: [
    viteTsConfigPaths({
      root: '../../'
    })
  ],

  test: {
    globals: true,
    cache: {
      dir: '../../node_modules/.vitest'
    },
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}']
  }
});
