'use client';

import { Globe2 } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { hasLocalizedPath, localizedHref, localizedLocales, normalizeLocalizedPath } from '@/lib/localized-pages';

const labels: Record<string, string> = {
  en: 'English', es: 'Español', de: 'Deutsch', fr: 'Français', it: 'Italiano',
  pt: 'Português', nl: 'Nederlands', pl: 'Polski', da: 'Dansk', id: 'Bahasa Indonesia',
  tr: 'Türkçe', ja: '日本語', hi: 'हिन्दी', mr: 'मराठी',
};

function sourcePath(pathname: string) {
  const parts = pathname.split('/').filter(Boolean);
  if (parts[0] && localizedLocales.includes(parts[0] as typeof localizedLocales[number])) parts.shift();
  return normalizeLocalizedPath(parts.join('/'));
}

export function LanguageSelector() {
  const pathname = usePathname();
  const path = sourcePath(pathname);
  const current = pathname.split('/').filter(Boolean).at(0);
  const locale = current && localizedLocales.includes(current as typeof localizedLocales[number]) ? current : 'en';
  if (!hasLocalizedPath(path)) return null;

  return <label className="language-selector">
    <Globe2 size={15} aria-hidden="true" />
    <span className="sr-only">Select language</span>
    <select value={locale} onChange={(event) => {
      const next = event.target.value;
      window.location.assign(next === 'en' ? path : localizedHref(next as typeof localizedLocales[number], path));
    }}>
      <option value="en">English</option>
      {localizedLocales.map((item) => <option key={item} value={item}>{labels[item]}</option>)}
    </select>
  </label>;
}
