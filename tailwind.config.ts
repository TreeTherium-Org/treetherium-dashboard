import type { Config } from 'tailwindcss';

const config: Pick<Config, 'prefix' | 'content'> = {
  content: [
    './src/**/*.tsx',
    './node_modules/rizzui/dist/*.{js,ts,jsx,tsx}',
    '../../packages/isomorphic-core/src/**/*.{js,ts,jsx,tsx}',
  ],
};

export default config;
