import { useBem } from '@musica-sacra/hooks';
import { Hr } from '../../components/hr/Hr';
import { Button } from '@musica-sacra/forms';
import { useUser } from '../../context/userContext/useUser';
import { NavLink } from 'react-router';
import { SidebarHeader } from '../../components/sidebarHeader/SidebarHeader';

export function Dashboard() {
    const { bem } = useBem('admin-dashboard');
    const { logout } = useUser();

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
                <NavLink to={'/'}>Upraviť profil</NavLink>
                <NavLink to={'/'}>Resetovať heslo</NavLink>
                <NavLink to={'/'}>Upraviť profil</NavLink>
                <NavLink to={'/'}>Resetovať heslo</NavLink>
                <br />
                <NavLink to={'/'}>Upraviť profil</NavLink>
                <NavLink to={'/'}>Resetovať heslo</NavLink>
                <br />
                <NavLink to={'/'}>Upraviť profil</NavLink>
                <NavLink to={'/'}>Resetovať heslo</NavLink>
            </div>
        </div>
    );
}
