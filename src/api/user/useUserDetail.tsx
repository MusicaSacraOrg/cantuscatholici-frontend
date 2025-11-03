import { useContext, useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { UserService } from './UserService';
import {
  NotificationsContext,
  NotificationTypes,
} from '@musica-sacra/notifications';
import { Loader } from '@musica-sacra/loader';

export function useUserDetail(id: string | undefined | null) {
  const { addNotification, removeNotification } =
    useContext(NotificationsContext);
  const loadingNotificationId = useRef<string | null>(null);

  const query = useQuery({
    queryKey: ['user', id],
    queryFn: async () => {
      if (!id) throw new Error('No id provided');
      const response = await UserService.getUser(id);
      return response.data;
    },
    enabled: !!id,
    staleTime: Infinity,
    gcTime: Infinity,
  });

  // Manage loading notification lifecycle
  useEffect(() => {
    if (query.isFetching && !loadingNotificationId.current) {
      // show an infinite loading notification (timeout 0)
      loadingNotificationId.current = addNotification(
        'Načítavam',
        NotificationTypes.LOADING,
        0,
      );
    }

    if (!query.isFetching && loadingNotificationId.current) {
      removeNotification(loadingNotificationId.current);
      loadingNotificationId.current = null;
    }

    return () => {
      if (loadingNotificationId.current) {
        removeNotification(loadingNotificationId.current);
        loadingNotificationId.current = null;
      }
    };
  }, [query.isFetching, addNotification, removeNotification]);

  // On error, show notification
  useEffect(() => {
    if (query.isError) {
      const message =
        (query.error as Error)?.message || 'Chyba pri načítaní používateľa';
      addNotification(message, NotificationTypes.ERROR);
    }
  }, [query.isError, query.error, addNotification]);

  return {
    data: query.data,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error,
    // convenience renderable loader; consumer can also import Loader directly
    Loader: query.isLoading ? <Loader /> : null,
  };
}
