import { AuthService } from './AuthService';
import { useQuery } from '@tanstack/react-query';

export function useGetCurrentUser() {
    return useQuery({
        queryKey: ['currentUser'],
        queryFn: () => AuthService.getCurrentUser(),
        staleTime: Infinity,
        gcTime: Infinity,
    });
}
