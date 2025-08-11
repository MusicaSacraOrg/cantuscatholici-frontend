import { Navigate, Outlet } from 'react-router';
import { Role } from './roles';

type ProtectedRouteProps = {
    allowedRoles: Role[];
};

export function ProtectedRoutes({ allowedRoles }: ProtectedRouteProps) {
    // Mocked data
    // Todo replace with implementation of logged user
    const user: undefined | { role: Role } = {
        role: 'admin',
    };

    if (allowedRoles.includes(user?.role)) {
        return <Outlet />;
    } else {
        return <Navigate to="/login" />;
    }
}
