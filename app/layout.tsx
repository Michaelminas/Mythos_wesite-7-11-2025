import type { Metadata, Viewport } from 'next'
import { TICKET_DOMAIN } from './config'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.mythosentertainment.com.au'),
  alternates: {
    canonical: '/',
  },
  title: 'MYTHOS - House Meets Heritage',
  description: 'Experience MYTHOS - Sydney\'s modern European nightlife. Saturday 19 September, 9pm – Late at Pelicano, Potts Point',
  keywords: 'MYTHOS, Sydney nightlife, Greek music, European anthems, Pelicano, Potts Point, VIP table booking',
  authors: [{ name: 'MYTHOS Entertainment' }],
  verification: {
    google: '_bSUsETV80XS12d_O4pxna5Reiw5WRB1VsdTP_OGQYQ',
  },
  openGraph: {
    title: 'MYTHOS - House Meets Heritage',
    description: 'Experience MYTHOS - Sydney\'s modern European nightlife. Saturday 19 September, 9pm – Late at Pelicano, Potts Point',
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
    title: 'MYTHOS - House Meets Heritage',
    description: 'Experience MYTHOS - Sydney\'s modern European nightlife. Saturday 19 September, 9pm – Late at Pelicano, Potts Point',
    images: ['/mythos-branding/mythos-o-no-bg.png'],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#96694c',
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

        {/* Preconnect for critical resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Font loading with display=swap for better performance */}
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@300;400;700;900&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&display=swap" rel="stylesheet" />

        {/* Preload critical assets */}
        <link rel="preload" as="image" href="/mythos-branding/logo-final.png" />
        <link rel="preload" as="video" href="/Videos/First half.webm" />
        <link rel="preload" as="video" href="/Videos/Second half.webm" />
      </head>
      <body>{children}</body>
    </html>
  )
}
