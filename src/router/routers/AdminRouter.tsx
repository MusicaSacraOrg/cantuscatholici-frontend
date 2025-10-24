import { Route, Routes } from 'react-router';
import { Paths } from '../paths';
import { NotFoundView } from '../../views/notFoundView/NotFoundView';
import { ProtectedRoutes } from '../ProtectedRoutes';
import { Roles } from '../roles';
import { DefaultAdminView } from '../../admin/views/DefaultAdminView';

export function AdminRouter() {
    return (
        <Routes>
            <Route
                element={
                    <ProtectedRoutes
                        allowedRoles={[Roles.USER, Roles.REDACTOR, Roles.ADMIN]}
                    />
                }
            >
                <Route path={Paths.ADMIN_HOME} element={<DefaultAdminView />} />
                <Route
                    path={Paths.ADMIN_EDIT_PROFILE}
                    element={<DefaultAdminView />}
                />
                <Route
                    path={Paths.ADMIN_RESET_PASSWORD}
                    element={<DefaultAdminView />}
                />
            </Route>

            <Route
                element={
                    <ProtectedRoutes
                        allowedRoles={[Roles.REDACTOR, Roles.ADMIN]}
                    />
                }
            >
                <Route
                    path={Paths.ADMIN_SONG_LIST}
                    element={<DefaultAdminView />}
                />
                <Route
                    path={Paths.ADMIN_SONG_EDIT}
                    element={<DefaultAdminView />}
                />
                <Route
                    path={Paths.ADMIN_SONG_DETAIL}
                    element={<DefaultAdminView />}
                />
                <Route
                    path={Paths.ADMIN_SONG_CREATE}
                    element={<DefaultAdminView />}
                />
            </Route>

            <Route element={<ProtectedRoutes allowedRoles={[Roles.ADMIN]} />}>
                <Route
                    path={Paths.ADMIN_TAG_LIST}
                    element={<DefaultAdminView />}
                />
                <Route
                    path={Paths.ADMIN_TAG_EDIT}
                    element={<DefaultAdminView />}
                />
                <Route
                    path={Paths.ADMIN_TAG_DETAIL}
                    element={<DefaultAdminView />}
                />
                <Route
                    path={Paths.ADMIN_TAG_CREATE}
                    element={<DefaultAdminView />}
                />

                <Route
                    path={Paths.ADMIN_TAG_CATEGORY_LIST}
                    element={<DefaultAdminView />}
                />
                <Route
                    path={Paths.ADMIN_TAG_CATEGORY_EDIT}
                    element={<DefaultAdminView />}
                />
                <Route
                    path={Paths.ADMIN_TAG_CATEGORY_DETAIL}
                    element={<DefaultAdminView />}
                />
                <Route
                    path={Paths.ADMIN_TAG_CATEGORY_CREATE}
                    element={<DefaultAdminView />}
                />
            </Route>

            <Route path={'*'} element={<NotFoundView />} />
        </Routes>
    );
}
