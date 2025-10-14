import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router';

export function useUrlParams() {
    const location = useLocation();
    const navigate = useNavigate();

    const getParams = useCallback(() => {
        const searchParams = new URLSearchParams(location.search);
        const params: Record<string, string> = {};
        for (const [key, value] of searchParams.entries()) {
            params[key] = value;
        }
        return params;
    }, [location.search]);

    const setParams = useCallback(
        (
            params: Record<string, string | number | boolean | null | undefined>
        ) => {
            try {
                const searchParams = new URLSearchParams(location.search);

                Object.entries(params).forEach(([key, value]) => {
                    if (value === null || value === undefined || value === '') {
                        searchParams.delete(key);
                    } else {
                        searchParams.set(key, String(value));
                    }
                });

                // Avoid redundant navigation (which can cause re-renders)
                const newUrl = `${location.pathname}?${searchParams.toString()}`;
                const currentUrl = `${location.pathname}${location.search}`;
                if (newUrl !== currentUrl) {
                    navigate(newUrl, { replace: true });
                }
            } catch (error) {
                console.warn('Failed to update URL params:', error);
            }
        },
        [location, navigate]
    );

    return { setParams, getParams };
}
