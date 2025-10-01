// import {
//     MutationFunction,
//     useMutation,
//     UseMutationOptions,
//     useQueryClient,
// } from '@tanstack/react-query';
// import { useContext } from 'react';
// import {
//     NotificationsContext,
//     NotificationTypes,
// } from '@musica-sacra/notifications';
// import { AxiosError } from 'axios';
//
// type MutationContext = { loadingNotificationId?: string };
//
// export function useApiMutation<TData, TVariables>(
//     mutationFn: MutationFunction,
//     options?: UseMutationOptions<TData, TVariables, MutationContext>
// ) {
//     const queryClient = useQueryClient();
//     const { addNotification, removeNotification } =
//         useContext(NotificationsContext);
//
//     return useMutation<TData, Error, TVariables, MutationContext>({
//         mutationFn,
//         onMutate: async () => {
//             const loadingNotificationId = addNotification(
//                 'Loading..',
//                 NotificationTypes.LOADING
//             );
//             return { loadingNotificationId };
//         },
//         onError: (error: any, _, context) => {
//             if (context?.loadingNotificationId) {
//                 removeNotification(context.loadingNotificationId);
//             }
//         },
//         onSucess: (data: any, context: MutationContext) => {
//             if (context?.loadingNotificationId) {
//                 removeNotification(context.loadingNotificationId);
//             }
//         },
//     });
// }
