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

const ignored = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'SVG', 'TEXTAREA']);
const normalize = (value: string) => value.replace(/\s+/g, ' ').trim();

export function LocalizedCopy({ locale, children }: { locale: LocalizedLocale; children: React.ReactNode }) {
  useEffect(() => {
    let active = true;
    let observer: MutationObserver | undefined;
    dictionaries[locale]().then(({ default: dictionary }) => {
      if (!active) return;
      const root = document.body;
      const translateRoot = (scope: Node) => {
        const textNodes: Text[] = [];
        const collect = (node: Node) => {
          if (node.nodeType === Node.TEXT_NODE) {
            const parent = node.parentElement;
            if (parent && !ignored.has(parent.tagName)) textNodes.push(node as Text);
          }
          node.childNodes.forEach(collect);
        };
        collect(scope);
        textNodes.forEach((node) => {
          const source = normalize(node.nodeValue || '');
          const translated = dictionary[source];
          if (!translated || translated === source) return;
          const original = node.nodeValue || '';
          const leading = original.match(/^\s*/)?.[0] || '';
          const trailing = original.match(/\s*$/)?.[0] || '';
          node.nodeValue = leading + translated + trailing;
        });
        if (scope instanceof Element) scope.querySelectorAll<HTMLElement>('[placeholder],[title],[aria-label]').forEach((element) => {
          ['placeholder', 'title', 'aria-label'].forEach((attribute) => {
            const source = element.getAttribute(attribute);
            if (source && dictionary[source]) element.setAttribute(attribute, dictionary[source]);
          });
        });
      };
      translateRoot(root);
      observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => mutation.addedNodes.forEach((node) => {
          if (node instanceof Element || node.nodeType === Node.TEXT_NODE) translateRoot(node);
        }));
      });
      observer.observe(root, { subtree: true, childList: true });
      document.documentElement.lang = locale === 'hi' ? 'hi-IN' : locale === 'mr' ? 'mr-IN' : locale;
    }).catch(() => undefined);
    return () => { active = false; observer?.disconnect(); };
  }, [locale]);

  return <div className="localized-copy">{children}</div>;
}
