import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { SiteHeader, SiteFooter } from '@/components/site-shell';
import { CookieConsent } from '@/components/cookie-consent';
import { Analytics } from '@/components/analytics';
import { SiteStructuredData } from '@/components/structured-data';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.sansoftonline.com'),
  verification: { google: '3LlWj19-Wfiz7sGzvHLefa-xxsOF0OZU-1iJlAk1kuU' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } },
  title: 'Sansoft | Digital marketing that moves business forward',
  description: 'SEO, paid media and creative marketing for ambitious businesses. Strategy, execution and measurable growth from Sansoft.',
  icons: {
    icon: [{ url: '/favicon.png', type: 'image/png', sizes: '384x384' }],
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>
    <SiteStructuredData />
    <SiteHeader />{children}<SiteFooter /><CookieConsent />
    <Script id="google-analytics-loader" src="https://www.googletagmanager.com/gtag/js?id=G-0P366CPYJX" strategy="afterInteractive" />
    <Analytics />
  </body></html>;
}
