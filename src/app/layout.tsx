import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { SiteHeader, SiteFooter } from '@/components/site-shell';
import { CookieConsent } from '@/components/cookie-consent';
import { Analytics } from '@/components/analytics';
import { SiteStructuredData } from '@/components/structured-data';
import { LocalizedInternalLinks } from '@/components/localized-internal-links';
import { WhatsAppChat } from '@/components/whatsapp-chat';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.sansoftonline.com'),
  verification: { google: '3LlWj19-Wfiz7sGzvHLefa-xxsOF0OZU-1iJlAk1kuU' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } },
  title: 'Sansoft | Digital marketing that moves business forward',
  description: 'SEO, paid media and creative marketing for ambitious businesses. Strategy, execution and measurable growth from Sansoft.',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-48.png', type: 'image/png', sizes: '48x48' },
      { url: '/favicon.png', type: 'image/png', sizes: '384x384' },
    ],
    shortcut: '/favicon.ico',
    apple: [{ url: '/favicon.png', type: 'image/png', sizes: '180x180' }],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>
    <SiteStructuredData />
    <SiteHeader />{children}<SiteFooter /><LocalizedInternalLinks /><WhatsAppChat /><CookieConsent />
    <Script id="google-analytics-loader" src="https://www.googletagmanager.com/gtag/js?id=G-0P366CPYJX" strategy="beforeInteractive" />
    <Analytics />
  </body></html>;
}
