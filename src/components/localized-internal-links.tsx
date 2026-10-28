'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { hasLocalizedPath, localizedHref, localizedLocales, type LocalizedLocale } from '@/lib/localized-pages';

function activeLocaleFor(pathname: string): LocalizedLocale | null {
  const first = pathname.split('/').filter(Boolean)[0];
  return first && localizedLocales.includes(first as LocalizedLocale) ? first as LocalizedLocale : null;
}

export function LocalizedInternalLinks() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const locale = activeLocaleFor(pathname);
    if (!locale) return;

    const localizedUrl = (anchor: HTMLAnchorElement) => {
      const rawHref = anchor.getAttribute('href');
      if (!rawHref || rawHref.startsWith('#') || anchor.hasAttribute('download') || anchor.dataset.noLocale === 'true') return null;
      let url: URL;
      try {
        url = new URL(rawHref, window.location.href);
      } catch {
        return null;
      }
      if (url.origin !== window.location.origin || !['http:', 'https:'].includes(url.protocol)) return null;

      const pathSegments = url.pathname.split('/').filter(Boolean);
      const existingLocale = pathSegments[0] && localizedLocales.includes(pathSegments[0] as LocalizedLocale) ? pathSegments.shift() as LocalizedLocale : null;
      const sourcePath = '/' + pathSegments.join('/');
      if (!hasLocalizedPath(sourcePath)) return null;

      const destination = localizedHref(locale, sourcePath) + url.search + url.hash;
      if (existingLocale !== locale || anchor.getAttribute('href') !== destination) anchor.setAttribute('href', destination);
      anchor.dataset.localizedHref = destination;
      return destination;
    };

    const updateLinks = (root: ParentNode = document) => {
      if (root instanceof HTMLAnchorElement) localizedUrl(root);
      root.querySelectorAll?.('a[href]').forEach((anchor) => localizedUrl(anchor as HTMLAnchorElement));
    };

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const target = event.target instanceof Element ? event.target.closest('a[data-localized-href]') as HTMLAnchorElement | null : null;
      if (!target || (target.target && target.target !== '_self')) return;
      const destination = target.dataset.localizedHref;
      if (!destination) return;
      event.preventDefault();
      router.push(destination);
    };

    updateLinks();
    document.addEventListener('click', onClick, true);
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'attributes' && mutation.target instanceof HTMLAnchorElement) localizedUrl(mutation.target);
        mutation.addedNodes.forEach((node) => {
          if (node instanceof Element) updateLinks(node);
        });
      }
    });
    observer.observe(document.body, { subtree: true, childList: true, attributes: true, attributeFilter: ['href'] });
    return () => {
      observer.disconnect();
      document.removeEventListener('click', onClick, true);
    };
  }, [pathname, router]);

  return null;
}
