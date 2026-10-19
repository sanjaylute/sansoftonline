import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { SiteHeader, SiteFooter } from '@/components/site-shell';
import { CookieConsent } from '@/components/cookie-consent';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.sansoftonline.com'),
  verification: { google: '3LlWj19-Wfiz7sGzvHLefa-xxsOF0OZU-1iJlAk1kuU' },
  title: 'Sansoft | Digital marketing that moves business forward',
  description: 'SEO, paid media and creative marketing for ambitious businesses. Strategy, execution and measurable growth from Sansoft.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TMMFSBJ2" height="0" width="0" style={{ display: 'none', visibility: 'hidden' }} title="Google Tag Manager" /></noscript>
    <SiteHeader />{children}<SiteFooter /><CookieConsent />
    <Script src="https://www.googletagmanager.com/gtag/js?id=G-0P366CPYJX" strategy="afterInteractive" />
    <Script id="google-analytics-gtag" strategy="afterInteractive">{`
      window.dataLayer = window.dataLayer || [];
      function gtag(){window.dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-0P366CPYJX');
    `}</Script>
    <Script id="google-tag-manager" strategy="afterInteractive">{`
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-TMMFSBJ2');
    `}</Script>
  </body></html>;
}
