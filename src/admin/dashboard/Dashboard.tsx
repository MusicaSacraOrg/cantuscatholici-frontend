import { useBem } from '@musica-sacra/hooks';
import { Hr } from '../../components/hr/Hr';
import { Button } from '@musica-sacra/forms';
import { useUser } from '../../context/userContext/useUser';
import { NavLink, useParams } from 'react-router';
import { SidebarHeader } from '../../components/sidebarHeader/SidebarHeader';

export function Dashboard() {
    const { bem } = useBem('admin-dashboard');
    const { logout } = useUser();

    const { userId } = useParams();

    return (
        <div className={bem()}>
            <SidebarHeader title={'Samuel Slávik'} subtitle={'admin'} />
            <div className={'link-group'}>
                <NavLink to={'/'}>Upraviť profil</NavLink>
                <NavLink to={'/'}>Resetovať heslo</NavLink>
            </div>
            <Button rounded onClick={logout}>
                Odhlásiť sa
            </Button>
            <Hr />
            <div className={'link-group'}>
                <NavLink to={`/dashboard/${userId}/*`}>Upraviť profil</NavLink>
                <NavLink to={`/dashboard/${userId}/`}>Resetovať heslo</NavLink>
                <NavLink to={`/dashboard/${userId}/`}>Upraviť profil</NavLink>
                <NavLink to={`/dashboard/${userId}/`}>Resetovať heslo</NavLink>
                <br />
                <NavLink to={`/dashboard/${userId}/`}>Upraviť profil</NavLink>
                <NavLink to={`/dashboard/${userId}/`}>Resetovať heslo</NavLink>
                <br />
                <NavLink to={`/dashboard/${userId}/`}>Upraviť profil</NavLink>
                <NavLink to={`/dashboard/${userId}/`}>Resetovať heslo</NavLink>
            </div>
        </div>
    );
}
