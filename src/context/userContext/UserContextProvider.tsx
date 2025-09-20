import { createContext } from 'react';
import { useGetCurrentUser } from '../../api/auth/useGetCurrentUser';

export const UserContext = createContext(null);

function UserProvider(props: any) {
    const { data: user } = useGetCurrentUser();

    return <UserContext.Provider value={user} {...props} />;
}

export { UserProvider };
