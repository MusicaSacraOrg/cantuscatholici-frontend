import { useBem } from '@musica-sacra/hooks';
import { Prince } from '@musica-sacra/layout';
import { useParams } from 'react-router';
import { useGetUser } from '../../api/user/useGetUser';
import { Loader } from '@musica-sacra/loader';
import './UserDetailView.scss';
import { UserDetail } from '../../models/user';
import { UserProfile } from '../../components/userProfile/UserProfile';

export function UserDetailView() {
    const { bem } = useBem('view-user-detail');
    const { id } = useParams<{ id?: string }>();

    if (!id) {
        return <div>User ID is required</div>;
    }

    const { data: user, isLoading, isError } = useGetUser(id);
    const userDetail = user as UserDetail | null;

    return (
        <Prince isPageLayout={true} className={bem()}>
            {isLoading && <Loader />}
            {isError && <div>Chyba pri načítaní používateľa</div>}
            {!isLoading && userDetail && (
                <div className={bem('profile')}>
                    <UserProfile user={userDetail} />
                </div>
            )}
            {!isLoading && !userDetail && !isError && (
                <div>Používateľ nenájdený</div>
            )}
        </Prince>
    );
}
