import { Navigate, Outlet } from 'react-router';
import { Role } from './roles';
import { useContext, useEffect } from 'react';
import {
    NotificationsContext,
    NotificationTypes,
} from '@musica-sacra/notifications';
import { useUser } from '../context/userContext/useUser';
import { Container } from '@musica-sacra/layout';
import { Loader } from '@musica-sacra/loader';

type ProtectedRoutesProps = {
    allowedRoles: Role[];
};

export function ProtectedRoutes({ allowedRoles }: ProtectedRoutesProps) {
    const { addNotification } = useContext(NotificationsContext);
    const { user, authenticatingUser } = useUser();

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

    // if (authenticatingUser) {
    //     return (
    //         <Container isPageContainer>
    //             <Loader />
    //         </Container>
    //     );
    // }
    //
    // if (!user || !allowedRoles.includes(user.role)) {
    //     return <Navigate to="/login" />;
    // }

    return <Outlet />;
}
