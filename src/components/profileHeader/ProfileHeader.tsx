import { useBem } from '@musica-sacra/hooks';
import { Role } from '../../router/roles';

type ProfileHeaderProps = {
    name: string;
    surname: string;
    role: Role;
};

export function ProfileHeader({ name, surname, role }: ProfileHeaderProps) {
    const { bem } = useBem('profile-header');

    return (
        <div className={bem()}>
            <h1 className={bem('name')}>
                {name} {surname}
            </h1>
            <h2 className={bem('role')}>{role}</h2>
        </div>
    );
}
