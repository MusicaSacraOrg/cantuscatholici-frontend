import type { Preview } from '@storybook/react';
import { MemoryRouter } from 'react-router';
import { NotificationsContextProvider } from '@musica-sacra/notifications';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UserProvider } from '../src/context/userContext/UserContextProvider';

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

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
            refetchOnWindowFocus: false,
        },
    },
});

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
    decorators: [
        (Story) => (
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <UserProvider>
                        <NotificationsContextProvider>
                            <Story />
                        </NotificationsContextProvider>
                    </UserProvider>
                </MemoryRouter>
            </QueryClientProvider>
        ),
    ],
};

export default preview;
