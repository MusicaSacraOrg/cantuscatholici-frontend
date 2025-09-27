import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthService } from './AuthService';
import { Credentials } from '../../models/auth';
import { useContext } from 'react';
import {
    NotificationsContext,
    NotificationTypes,
} from '@musica-sacra/notifications';

export function useLogin() {
    const queryClient = useQueryClient();

    const { addNotification, removeNotification } =
        useContext(NotificationsContext);

    // Todo Remove the 2 seconds simuation
    const delay = (ms: number) =>
        new Promise((resolve) => setTimeout(resolve, ms));

    return useMutation({
        // Todo Remove the 2 seconds simuation
        mutationFn: async (credentials: Credentials) => {
            await delay(2000); // simulate 2 seconds loading
            return AuthService.login(credentials);
        },
        onMutate: () => {
            const loadingNotificationId = addNotification(
                'Loading ...',
                NotificationTypes.LOADING
            );
            return { loadingNotificationId };
        },
        onSuccess: (user, _, onMutateResult) => {
            queryClient.setQueryData(['user'], user);

            if (onMutateResult?.loadingNotificationId) {
                removeNotification(onMutateResult.loadingNotificationId);
            }
        },
        onError: (error, _, onMutateResult) => {
            if (onMutateResult?.loadingNotificationId) {
                removeNotification(onMutateResult.loadingNotificationId);
            }

            addNotification(error.message, NotificationTypes.ERROR);
        },
    });
}
