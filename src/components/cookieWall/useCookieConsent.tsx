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

  const acceptCookiesConsent = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, 'accepted');
    setChoice('accepted');
  }, []);

  const rejectCookiesConsent = useCallback(() => {
    sessionStorage.setItem(STORAGE_KEY, 'rejected');
    setChoice('rejected');
  }, []);

  const clearCookiesConsent = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setChoice(null);
  }, []);

  const isAccepted = useCallback(() => {
    return localStorage.getItem(STORAGE_KEY) === 'accepted';
  }, []);

  const isRejected = useCallback(() => {
    return sessionStorage.getItem(STORAGE_KEY) === 'rejected';
  }, []);

  return {
    acceptCookiesConsent,
    rejectCookiesConsent,
    clearCookiesConsent,
    isAccepted,
    isRejected,
  };
}
