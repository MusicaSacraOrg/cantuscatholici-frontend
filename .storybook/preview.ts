import type { Preview } from '@storybook/react';

declare const require: {
    context: (
        path: string,
        deep?: boolean,
        filter?: RegExp
    ) => {
        keys: () => string[];
        (key: string): unknown;
    };
};

const scssReq = require.context(
    '../src',
    true, // recursive
    /\.scss$/
);

scssReq.keys().forEach(scssReq); // Import each one

const preview: Preview = {
    parameters: {
        actions: { argTypesRegex: '^on[A-Z].*' },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
    },
};

export default preview;
