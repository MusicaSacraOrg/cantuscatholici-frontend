import { createContext } from 'react';
import { useGetCurrentUser } from '../../api/auth/useGetCurrentUser';
import { User } from '../../models/user';
import { useNavigate } from 'react-router';
import { useQueryClient } from '@tanstack/react-query';
import { ReactNode } from 'react';

type UserContextType = {
    user: User | null;
    authenticatingUser: boolean;
    logout: () => void;
};

export const UserContext = createContext<UserContextType | undefined>(
    undefined
);

type UserProviderProps = {
    children: ReactNode;
};

function UserProvider(props: UserProviderProps) {
    const { data: user, isLoading } = useGetCurrentUser();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const logout = async () => {
        await navigate('/');
        localStorage.removeItem('token');
        queryClient.setQueryData(['currentUser'], null);
    };

    return (
        <UserContext.Provider
            value={{
                user: user ?? null,
                authenticatingUser: isLoading,
                logout,
            }}
            {...props}
        />
    );
}

export { UserProvider };
