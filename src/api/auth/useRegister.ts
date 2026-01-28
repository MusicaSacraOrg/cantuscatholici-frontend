import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext } from 'react';
import {
    NotificationsContext,
    NotificationTypes,
} from '@musica-sacra/notifications';
import { AuthService } from './AuthService';
import { NewUser } from '../../models/auth';
import { useNavigate } from 'react-router';

const authService = new AuthService();

export function useRegister() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { addNotification, removeNotification } =
        useContext(NotificationsContext);

    return useMutation({
        mutationFn: async (newUser: NewUser) => {
            return await authService.register(newUser);
        },
        onMutate: () => {
            const loadingNotificationId = addNotification(
                'Načítavam',
                NotificationTypes.LOADING
            );
            return { loadingNotificationId };
        },
        onSuccess: ({ data }, _, onMutateResult) => {
            queryClient.setQueryData(['currentUser'], data);

            if (onMutateResult?.loadingNotificationId) {
                removeNotification(onMutateResult.loadingNotificationId);
            }

            navigate(`/dashboard/${data.id}`);
        },
        onError: (error, _, onMutateResult) => {
            if (onMutateResult?.loadingNotificationId) {
                removeNotification(onMutateResult.loadingNotificationId);
            }

            addNotification(error.message, NotificationTypes.ERROR);
        },
    });
}
