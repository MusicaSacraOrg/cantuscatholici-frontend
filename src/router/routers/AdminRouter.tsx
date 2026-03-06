import { Route, Routes } from 'react-router';
import { Paths } from '../paths';
import { NotFoundView } from '../../views/notFoundView/NotFoundView';
import { ProtectedRoutes } from '../ProtectedRoutes';
import { Roles } from '../roles';
import { DefaultAdminView } from '../../admin/pages/DefaultAdminView';
import { EditProfileView } from '../../admin/pages/profile/EditProfileView';
import { ResetPasswordView } from '../../admin/pages/profile/ResetPasswordView';
import { TagCategoryListView } from '../../admin/pages/tagCategory/TagCategoryListView';
import { TagCategoryFormView } from '../../admin/pages/tagCategory/TagCategoryFormView';
import { TagListView } from '../../admin/pages/tag/TagListView';
import { TagFormView } from '../../admin/pages/tag/TagFormView';
import { SongListView } from '../../admin/pages/song/SongListView';
import { SongFormView } from '../../admin/pages/song/SongFormView';

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
                    element={<EditProfileView />}
                />
                <Route
                    path={Paths.ADMIN_RESET_PASSWORD}
                    element={<ResetPasswordView />}
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
                    element={<SongListView />}
                />
                <Route
                    path={Paths.ADMIN_SONG_EDIT}
                    element={<SongFormView />}
                />
                <Route
                    path={Paths.ADMIN_SONG_DETAIL}
                    element={<DefaultAdminView />}
                />
                <Route
                    path={Paths.ADMIN_SONG_CREATE}
                    element={<SongFormView />}
                />
            </Route>

            <Route element={<ProtectedRoutes allowedRoles={[Roles.ADMIN]} />}>
                <Route
                    path={Paths.ADMIN_TAG_LIST}
                    element={<TagListView />}
                />
                <Route
                    path={Paths.ADMIN_TAG_EDIT}
                    element={<TagFormView />}
                />
                <Route
                    path={Paths.ADMIN_TAG_DETAIL}
                    element={<DefaultAdminView />}
                />
                <Route
                    path={Paths.ADMIN_TAG_CREATE}
                    element={<TagFormView />}
                />

                <Route
                    path={Paths.ADMIN_TAG_CATEGORY_LIST}
                    element={<TagCategoryListView />}
                />
                <Route
                    path={Paths.ADMIN_TAG_CATEGORY_EDIT}
                    element={<TagCategoryFormView />}
                />
                <Route
                    path={Paths.ADMIN_TAG_CATEGORY_DETAIL}
                    element={<DefaultAdminView />}
                />
                <Route
                    path={Paths.ADMIN_TAG_CATEGORY_CREATE}
                    element={<TagCategoryFormView />}
                />
            </Route>

            <Route path={'*'} element={<NotFoundView />} />
        </Routes>
    );
}
