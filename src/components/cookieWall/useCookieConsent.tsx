import { useEffect, useState, useCallback } from 'react';

const STORAGE_KEY = 'cookiesChoice';

export type CookiesChoice = 'accepted' | 'rejected' | null;

export function useCookiesConsent() {
    const [choice, setChoice] = useState<CookiesChoice>(null);

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY) as CookiesChoice;
        if (stored) {
            setChoice(stored);
        }
    }, []);

    const accept = useCallback(() => {
        localStorage.setItem(STORAGE_KEY, 'accepted');
        setChoice('accepted');
    }, []);

    const reject = useCallback(() => {
        localStorage.setItem(STORAGE_KEY, 'rejected');
        setChoice('rejected');
    }, []);

    return {
        choice,
        isAccepted: choice === 'accepted',
        isRejected: choice === 'rejected',
        accept,
        reject,
    };
}
