'use client';

import { useEffect } from 'react';
import type { LocalizedLocale } from '@/lib/localized-pages';

type Dictionary = Record<string, string>;

const dictionaries: Record<LocalizedLocale, () => Promise<{ default: Dictionary }>> = {
  es: () => import('@/locales/es.json'), de: () => import('@/locales/de.json'),
  fr: () => import('@/locales/fr.json'), it: () => import('@/locales/it.json'),
  pt: () => import('@/locales/pt.json'), nl: () => import('@/locales/nl.json'),
  pl: () => import('@/locales/pl.json'), da: () => import('@/locales/da.json'),
  id: () => import('@/locales/id.json'), tr: () => import('@/locales/tr.json'),
  ja: () => import('@/locales/ja.json'), hi: () => import('@/locales/hi.json'),
  mr: () => import('@/locales/mr.json'),
};

const ignored = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'SVG', 'TEXTAREA', 'OPTION']);
const normalize = (value: string) => value.replace(/\s+/g, ' ').trim();

export function LocalizedCopy({ locale, children }: { locale: LocalizedLocale; children: React.ReactNode }) {
  useEffect(() => {
    let active = true;
    dictionaries[locale]().then(({ default: dictionary }) => {
      if (!active) return;
      const root = document.body;
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      const textNodes: Text[] = [];
      while (walker.nextNode()) {
        const node = walker.currentNode as Text;
        if (!node.parentElement || ignored.has(node.parentElement.tagName)) continue;
        textNodes.push(node);
      }
      textNodes.forEach((node) => {
        const source = normalize(node.nodeValue || '');
        const translated = dictionary[source];
        if (!translated || translated === source) return;
        const original = node.nodeValue || '';
        const leading = original.match(/^\s*/)?.[0] || '';
        const trailing = original.match(/\s*$/)?.[0] || '';
        node.nodeValue = leading + translated + trailing;
      });
      root.querySelectorAll<HTMLElement>('[placeholder],[title],[aria-label]').forEach((element) => {
        ['placeholder', 'title', 'aria-label'].forEach((attribute) => {
          const source = element.getAttribute(attribute);
          if (source && dictionary[source]) element.setAttribute(attribute, dictionary[source]);
        });
      });
      document.documentElement.lang = locale === 'hi' ? 'hi-IN' : locale === 'mr' ? 'mr-IN' : locale;
    }).catch(() => undefined);
    return () => { active = false; };
  }, [locale]);

  return <div className="localized-copy">{children}</div>;
}
