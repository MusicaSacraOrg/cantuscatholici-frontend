import { useBem } from '@musica-sacra/hooks';
import { Hr } from '../../components/hr/Hr';
import { Button } from '@musica-sacra/forms';
import { useUser } from '../../context/userContext/useUser';
import { NavLink, useParams } from 'react-router';
import { SidebarHeader } from '../../components/sidebarHeader/SidebarHeader';
import { Roles } from '../../router/roles';

export function Dashboard() {
    const { bem } = useBem('admin-dashboard');
    const { user, logout } = useUser();

    const { userId } = useParams();

    const displayName = user
        ? `${user.name} ${user.surname}`
        : '';
    const displayRole = user?.role ?? '';

    const isAdmin = user?.role === Roles.ADMIN;
    const isRedactorOrAdmin =
        user?.role === Roles.REDACTOR || user?.role === Roles.ADMIN;

    return (
        <div className={bem()}>
            <SidebarHeader title={displayName} subtitle={displayRole} />
            <div className={'link-group'}>
                <NavLink to={`/dashboard/${userId}/edit`}>
                    Upraviť profil
                </NavLink>
                <NavLink to={`/dashboard/${userId}/reset-password`}>
                    Resetovať heslo
                </NavLink>
            </div>
            <Button rounded onClick={logout}>
                Odhlásiť sa
            </Button>
            <Hr />
            {isRedactorOrAdmin && (
                <div className={'link-group'}>
                    <NavLink to={`/dashboard/${userId}/song`}>Piesne</NavLink>
                </div>
            )}
            {isAdmin && (
                <>
                    <Hr />
                    <div className={'link-group'}>
                        <NavLink to={`/dashboard/${userId}/tag-category`}>
                            Kategórie tagov
                        </NavLink>
                        <NavLink to={`/dashboard/${userId}/tag`}>Tagy</NavLink>
                    </div>
                </>
            )}
        </div>
    );
}
