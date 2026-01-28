import type { StorybookConfig } from '@storybook/react-webpack5';
import * as path from 'path';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';

// For ES modules compatibility with CommonJS require
// @ts-expect-error - import.meta is valid in ES modules (package.json has "type": "module")
// TypeScript's main config uses CommonJS, but Storybook runs in ES module context
const require = createRequire(import.meta.url);
// @ts-expect-error - import.meta is valid in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config: StorybookConfig = {
    stories: [
        '../src/**/__tests__/**/*.stories.@(js|jsx|mjs|ts|tsx)',
        // Temporarily disabled - these stories have import errors
        // '../node_modules/@musica-sacra/**/__tests__/*.stories.@(js|jsx|mjs|ts|tsx)',
    ],
    addons: [
        '@storybook/addon-webpack5-compiler-swc',
        '@storybook/addon-essentials',
        '@storybook/addon-onboarding',
        '@storybook/addon-interactions',
    ],
    framework: {
        name: '@storybook/react-webpack5',
        options: {},
    },
    webpackFinal: async (config) => {
        config.module?.rules?.push({
            test: /\.scss$/,
            include: [
                path.resolve(__dirname, '../src'),
                path.resolve(__dirname, '../node_modules/@musica-sacra'),
            ],
            use: ['style-loader', 'css-loader', 'sass-loader'],
        });

        config.module?.rules?.push({
            test: /\.tsx?$/,
            include: [path.resolve(__dirname, '../node_modules/@musica-sacra')],
            use: [
                {
                    loader: require.resolve('babel-loader'),
                    options: {
                        presets: [
                            require.resolve('@babel/preset-env'),
                            require.resolve('@babel/preset-typescript'),
                            [
                                require.resolve('@babel/preset-react'),
                                { runtime: 'automatic' },
                            ],
                        ],
                    },
                },
            ],
        });
        return config;
    },
};
export default config;
