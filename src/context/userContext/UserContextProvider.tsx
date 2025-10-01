import { createContext } from 'react';
import { useGetCurrentUser } from '../../api/auth/useGetCurrentUser';
import { User } from '../../models/user';

type UserContextType = {
    user: User | null;
    authenticatingUser: boolean;
};

export const UserContext = createContext<UserContextType | undefined>(
    undefined
);

function UserProvider(props: any) {
    const { data: user, isLoading } = useGetCurrentUser();

    return (
        <UserContext.Provider
            value={{ user: user ?? null, authenticatingUser: isLoading }}
            {...props}
        />
    );
}

export { UserProvider };
