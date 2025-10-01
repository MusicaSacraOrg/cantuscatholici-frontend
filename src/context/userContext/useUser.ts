import { useContext } from 'react';
import { UserContext } from './UserContextProvider';

export function useUser() {
    const context = useContext(UserContext);

    console.log('UserContext:', context);

    if (context === undefined) {
        throw new Error('useUser must be used within context');
    }

    return context;
}
