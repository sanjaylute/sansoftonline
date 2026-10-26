'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Cookie, X } from 'lucide-react';

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      setVisible(!window.localStorage.getItem('sansoft-cookie-notice') && !window.localStorage.getItem('sansoft-cookie-choice'));
    } catch {
      setVisible(true);
    }
    const reopen = () => setVisible(true);
    window.addEventListener('sansoft-open-cookie-settings', reopen);
    return () => window.removeEventListener('sansoft-open-cookie-settings', reopen);
  }, []);

  function dismiss() {
    try {
      window.localStorage.setItem('sansoft-cookie-notice', 'acknowledged');
    } catch {
      // The choice still applies for this visit when browser storage is unavailable.
    }
    setVisible(false);
  }

  if (!visible) return null;

  return <aside className="cookie-consent" aria-label="Cookie preferences" aria-live="polite">
    <div className="cookie-consent-icon"><Cookie size={20}/></div>
    <div className="cookie-consent-copy"><strong>We value your privacy</strong><p>We use essential browser storage and website analytics to understand visits and improve our services. Read our <Link href="/privacy-policy/">Privacy Policy</Link>.</p></div>
    <div className="cookie-consent-actions"><button type="button" className="cookie-accept" onClick={dismiss}>Got it</button></div>
    <button type="button" className="cookie-dismiss" onClick={dismiss} aria-label="Dismiss cookie notice"><X size={17}/></button>
  </aside>;
}
