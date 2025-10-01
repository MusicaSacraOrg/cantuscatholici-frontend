import { Route, Routes } from 'react-router';
import { HomepageView } from '../../views/homepageView/HomepageView';
import { LoginView } from '../../views/loginView/LoginView';
import { Paths } from '../paths';
import { ProtectedRoutes } from '../ProtectedRoutes';
import { Roles } from '../roles';
import { AdminView } from '../../views/adminView/AdminView';
import { NotFoundView } from '../../views/notFoundView/NotFoundView';
import { AboutView } from '../../views/aboutView/AboutView';
import { RegisterView } from '../../views/registerView/RegisterView';

export function MainRouter() {
    return (
        <Routes>
            <Route path={Paths.HOMEPAGE} element={<HomepageView />} />
            <Route path={Paths.CALENDAR} element={<div />} />
            <Route path={Paths.ABOUT} element={<AboutView />} />
            <Route path={Paths.LOGIN} element={<LoginView />} />
            <Route path={Paths.REGISTER} element={<RegisterView />} />

            <Route
                element={
                    <ProtectedRoutes
                        allowedRoles={[Roles.USER, Roles.REDACTOR, Roles.ADMIN]}
                    />
                }
            >
                <Route path={Paths.ADMIN_HOME} element={<AdminView />} />
            </Route>

            <Route path={'*'} element={<NotFoundView />} />
        </Routes>
    );
}
