import { Navigate, Outlet } from 'react-router';
import { Role } from './roles';
import { useContext, useEffect, useState } from 'react';
import {
    NotificationsContext,
    NotificationTypes,
} from '@musica-sacra/notifications';

type ProtectedRoutesProps = {
    allowedRoles: Role[];
};

export function ProtectedRoutes({ allowedRoles }: ProtectedRoutesProps) {
    // Mocked data
    // Todo replace with implementation of logged user
    const user: undefined | { role: Role } = {
        role: 'admin',
    };

    const { addNotification } = useContext(NotificationsContext);
    const [shouldRedirect, setShouldRedirect] = useState(false);

    useEffect(() => {
        if (!user || !allowedRoles.includes(user.role)) {
            addNotification(
                'Pre pokračovanie sa prosím prihláste!',
                NotificationTypes.ERROR
            );
            setShouldRedirect(true);
        }
    }, []);

    if (shouldRedirect) {
        return <Navigate to="/login" />;
    }

    return <Outlet />;
}
