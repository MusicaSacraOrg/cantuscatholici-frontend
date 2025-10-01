import { AuthService } from './AuthService';
import { useQuery } from '@tanstack/react-query';

export function useGetCurrentUser() {
    return useQuery({
        queryKey: ['currentUser'],
        queryFn: async () => {
            const response = await AuthService.getCurrentUser();
            return response.data;
        },
        staleTime: Infinity,
        gcTime: Infinity,
    });
}
