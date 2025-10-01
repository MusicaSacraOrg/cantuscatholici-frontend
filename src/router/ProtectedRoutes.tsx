import { Navigate, Outlet } from 'react-router';
import { Role } from './roles';
import { useContext, useEffect } from 'react';
import {
    NotificationsContext,
    NotificationTypes,
} from '@musica-sacra/notifications';
import { useUser } from '../context/userContext/useUser';

type ProtectedRoutesProps = {
    allowedRoles: Role[];
};

export function ProtectedRoutes({ allowedRoles }: ProtectedRoutesProps) {
    const { addNotification } = useContext(NotificationsContext);
    const { user, authenticatingUser } = useUser();

    console.log('Frodo', user);

    useEffect(() => {
        if (
            !authenticatingUser &&
            (!user || !allowedRoles.includes(user?.role))
        ) {
            addNotification(
                'Pre pokračovanie sa prosím prihláste!',
                NotificationTypes.ERROR
            );
        }
    }, [authenticatingUser, user, allowedRoles, addNotification]);

    if (authenticatingUser) {
        return <div>Loader... </div>;
    }

    if (!user || !allowedRoles.includes(user.role)) {
        return <Navigate to="/login" />;
    }

    return <Outlet />;
}
