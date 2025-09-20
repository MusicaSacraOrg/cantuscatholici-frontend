import { useCallback } from 'react';

const STORAGE_KEY = 'cookiesChoice';
  const CONSENT_ACCEPTED = 'accepted';
  const CONSENT_REJECTED = 'rejected';

export type CookiesChoice = 'accepted' | 'rejected' | null;

function isCookiesConsentAccepted() {
  return localStorage.getItem(STORAGE_KEY) === CONSENT_ACCEPTED;
}

function isCookiesConsentSet() {
  return (
    localStorage.getItem(STORAGE_KEY) === CONSENT_ACCEPTED ||
    sessionStorage.getItem(STORAGE_KEY) === CONSENT_REJECTED
  );
}

export function useCookiesConsent() {


  const acceptCookiesConsent = useCallback(() => {
    if (sessionStorage.getItem(STORAGE_KEY) === CONSENT_REJECTED) {
      sessionStorage.removeItem(STORAGE_KEY);
    }
    localStorage.setItem(STORAGE_KEY, CONSENT_ACCEPTED);
  }, []);

  const rejectCookiesConsent = useCallback(() => {
    if (localStorage.getItem(STORAGE_KEY) === CONSENT_ACCEPTED) {
      localStorage.removeItem(STORAGE_KEY);
    }
    sessionStorage.setItem(STORAGE_KEY, CONSENT_REJECTED);
  }, []);

  return {
    acceptCookiesConsent,
    rejectCookiesConsent,
    isCookiesConsentAccepted,
    isCookiesConsentSet,
  };
}
