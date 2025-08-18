import { Route, Routes } from 'react-router';
import { HomepageView } from '../../views/homepageView/HomepageView';
import { LoginView } from '../../views/loginView/LoginView';
import { Paths } from '../paths';
import { ProtectedRoutes } from '../ProtectedRoutes';
import { Roles } from '../roles';
import { AdminView } from '../../views/adminView/AdminView';
import { NotFoundView } from '../../views/notFoundView/NotFoundView';

export function MainRouter() {
    return (
        <Routes>
            <Route path={Paths.HOMEPAGE} element={<HomepageView />} />
            <Route path={Paths.LOGIN} element={<LoginView />} />

            <Route
                element={
                    <ProtectedRoutes
                        allowedRoles={[
                            Roles.LOGGED_USER,
                            Roles.REDACTOR,
                            Roles.ADMIN,
                        ]}
                    />
                }
            >
                <Route path={Paths.ADMIN_HOME} element={<AdminView />} />
            </Route>

            <Route path={'*'} element={<NotFoundView />} />
        </Routes>
    );
}
