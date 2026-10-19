import type { Metadata } from 'next';
import { livePageMetadata } from '@/lib/live-seo-metadata';

export const metadata: Metadata = livePageMetadata('contact-us');

export default function ContactLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
