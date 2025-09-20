import { useContext } from 'react';
import { UserContext } from './UserContextProvider';

export function useUser() {
    const context = useContext(UserContext);

    if (context === undefined) {
        throw new Error('useUser must be used within context');
    }

    return context;
}
