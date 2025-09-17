import { useEffect, useState, useCallback } from 'react';

const STORAGE_KEY = 'cookiesChoice';

export type CookiesChoice = 'accepted' | 'rejected' | null;


export function useCookiesConsent() {
  const CONSENT_ACCEPTED = 'accepted';
  const CONSENT_REJECTED = 'rejected';

  const [isSet, setIsSet] = useState<boolean>(() =>
    localStorage.getItem(STORAGE_KEY) !== null ||
    sessionStorage.getItem(STORAGE_KEY) !== null
  );  
    useEffect(() => {
    const handler = () => {
      setIsSet(
        localStorage.getItem(STORAGE_KEY) !== null ||
        sessionStorage.getItem(STORAGE_KEY) !== null
      );
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  useEffect(() => {
    const storedLocal = localStorage.getItem(STORAGE_KEY) as CookiesChoice;
    const storedSession = sessionStorage.getItem(STORAGE_KEY) as CookiesChoice;    
        if (storedLocal && storedSession) {
        }
    
  }, []);

  const acceptCookiesConsent = useCallback(() => {
if (sessionStorage.getItem(STORAGE_KEY) === CONSENT_REJECTED) {
      sessionStorage.removeItem(STORAGE_KEY);
    }
    localStorage.setItem(STORAGE_KEY, CONSENT_ACCEPTED);
    setIsSet(true);
  }, []);

  const rejectCookiesConsent = useCallback(() => {
 if (localStorage.getItem(STORAGE_KEY) === CONSENT_ACCEPTED) {
      localStorage.removeItem(STORAGE_KEY);
    }
    sessionStorage.setItem(STORAGE_KEY, CONSENT_REJECTED);
    setIsSet(true);
  }, []);

  const clearCookiesConsent = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
  }, []);


  return {
    acceptCookiesConsent,
    rejectCookiesConsent,
    isCookiesConsentSet: isSet,
  };
}
