'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Cookie, X } from 'lucide-react';

type CookieChoice = 'all' | 'essential';

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      setVisible(!window.localStorage.getItem('sansoft-cookie-choice'));
    } catch {
      setVisible(true);
    }
    const reopen = () => setVisible(true);
    window.addEventListener('sansoft-open-cookie-settings', reopen);
    return () => window.removeEventListener('sansoft-open-cookie-settings', reopen);
  }, []);

  function choose(choice: CookieChoice) {
    try {
      window.localStorage.setItem('sansoft-cookie-choice', choice);
    } catch {
      // The choice still applies for this visit when browser storage is unavailable.
    }
    setVisible(false);
  }

  if (!visible) return null;

  return <aside className="cookie-consent" aria-label="Cookie preferences" aria-live="polite">
    <div className="cookie-consent-icon"><Cookie size={20}/></div>
    <div className="cookie-consent-copy"><strong>We value your privacy</strong><p>Essential browser storage helps the site work and remembers your choice. Optional analytics cookies will only be used with your consent. Read our <Link href="/privacy-policy/">Privacy Policy</Link>.</p></div>
    <div className="cookie-consent-actions"><button type="button" className="cookie-essential" onClick={()=>choose('essential')}>Essential only</button><button type="button" className="cookie-accept" onClick={()=>choose('all')}>Accept all</button></div>
    <button type="button" className="cookie-dismiss" onClick={()=>choose('essential')} aria-label="Continue with essential cookies only"><X size={17}/></button>
  </aside>;
}
