'use client';

import { usePathname } from 'next/navigation';
import { hasLocalizedPath, localizedHref, localizedLocales, normalizeLocalizedPath } from '@/lib/localized-pages';

const labels: Record<string, string> = {
  en: 'English', es: 'Español', de: 'Deutsch', fr: 'Français', it: 'Italiano',
  pt: 'Português', nl: 'Nederlands', pl: 'Polski', da: 'Dansk', id: 'Bahasa Indonesia',
  tr: 'Türkçe', ja: '日本語', hi: 'हिन्दी', mr: 'मराठी',
};

const flags: Record<string, string> = {
  en: '🇬🇧', es: '🇪🇸', de: '🇩🇪', fr: '🇫🇷', it: '🇮🇹', pt: '🇵🇹', nl: '🇳🇱',
  pl: '🇵🇱', da: '🇩🇰', id: '🇮🇩', tr: '🇹🇷', ja: '🇯🇵', hi: '🇮🇳', mr: '🇮🇳',
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
  const hasTranslation = hasLocalizedPath(path);

  return <label className="language-selector">
    <select aria-label="Language" value={locale} onChange={(event) => {
      const next = event.target.value;
      const destination = next === 'en'
        ? path
        : hasTranslation
          ? localizedHref(next as typeof localizedLocales[number], path)
          : localizedHref(next as typeof localizedLocales[number], '/');
      window.location.assign(destination);
    }}>
      <option value="en">{flags.en} EN — English</option>
      {localizedLocales.map((item) => <option key={item} value={item}>{flags[item]} {item.toUpperCase()} — {labels[item]}</option>)}
    </select>
  </label>;
}
