import { AuthService } from './AuthService';
import { useQuery } from '@tanstack/react-query';

const authService = new AuthService();

export function useGetCurrentUser() {
    return useQuery({
        queryKey: ['currentUser'],
        queryFn: async () => {
            const response = await authService.getCurrentUser();
            return response.data;
        },
        staleTime: Infinity,
        gcTime: Infinity,
    });
}
