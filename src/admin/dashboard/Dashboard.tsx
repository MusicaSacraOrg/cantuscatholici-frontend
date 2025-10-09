import { useBem } from '@musica-sacra/hooks';
import { Hr } from '../../components/hr/Hr';
import { Button } from '@musica-sacra/forms';
import { useUser } from '../../context/userContext/useUser';

export function Dashboard() {
    const { bem } = useBem('admin-dashboard');
    const { logout } = useUser();

    return (
        <div className={bem()}>
            <h3>Hello Adventurer</h3>
            <Hr />
            <Button rounded onClick={logout}>
                Odhlásiť sa
            </Button>
        </div>
    );
}
