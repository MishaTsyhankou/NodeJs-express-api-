import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
	verbose: true,
	preset: 'ts-jest',
	testRegex: '.e2e-spec.ts$',
	rootDir: './tests',
};

export default config;
