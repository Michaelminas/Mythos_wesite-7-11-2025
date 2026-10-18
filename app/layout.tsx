import type { Metadata, Viewport } from 'next'
import { TICKET_DOMAIN } from './config'
import './base.css'
import localFont from 'next/font/local'

const helvetica = localFont({
  src: [
    { path: '../public/font/HelveticaNeueRoman.otf', weight: '400', style: 'normal' },
    { path: '../public/font/HelveticaNeueMedium.otf', weight: '500', style: 'normal' },
    { path: '../public/font/HelveticaNeueBold.otf', weight: '700', style: 'normal' },
  ],
  display: 'swap',
  variable: '--font-helvetica-neue',
  preload: true,
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.mythosentertainment.com.au'),
  alternates: {
    canonical: '/',
  },
  title: 'MYTHOS White Boat Party | SEADECK | 27 November 2026',
  description: 'Join MYTHOS aboard SEADECK on Friday 27 November 2026 for the White Boat Party on Sydney Harbour. Greek, Eurohouse and Ibiza anthems. Book tickets.',
  keywords: 'MYTHOS, SEADECK, White Boat Party, 27 November 2026, Sydney Harbour, Greek music, Eurohouse, Ibiza anthems, boat party tickets',
  authors: [{ name: 'MYTHOS Entertainment' }],
  verification: {
    google: '_bSUsETV80XS12d_O4pxna5Reiw5WRB1VsdTP_OGQYQ',
  },
  openGraph: {
    title: 'MYTHOS White Boat Party | SEADECK | 27 November 2026',
    description: 'Join MYTHOS aboard SEADECK on Friday 27 November 2026 for the White Boat Party on Sydney Harbour. Greek, Eurohouse and Ibiza anthems. Book tickets.',
    type: 'website',
    url: 'https://www.mythosentertainment.com.au',
    siteName: 'MYTHOS',
    locale: 'en_AU',
    images: [
      {
        url: '/mythos-branding/mythos-o-no-bg.png',
        width: 548,
        height: 548,
        alt: 'MYTHOS Logo',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'MYTHOS White Boat Party | SEADECK | 27 November 2026',
    description: 'Join MYTHOS aboard SEADECK on Friday 27 November 2026 for the White Boat Party on Sydney Harbour. Greek, Eurohouse and Ibiza anthems. Book tickets.',
    images: ['/mythos-branding/mythos-o-no-bg.png'],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#087e88',
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en-AU">
      <head>
        {/* DNS Prefetch for external domains */}
        <link rel="dns-prefetch" href={TICKET_DOMAIN} />
        <link rel="dns-prefetch" href="https://formspree.io" />

        {/* Preload critical assets */}
        <link rel="preload" as="image" href="/mythos-branding/logo-final.png" />
      </head>
      <body className={helvetica.variable}>{children}</body>
    </html>
  )
}
