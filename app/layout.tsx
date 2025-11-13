import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://mythosentertainment.com.au'),
  alternates: {
    canonical: '/',
  },
  title: 'MYTHOS - House Meets Heritage',
  description: 'Experience MYTHOS - Sydney\'s modern European nightlife. Friday 19 December, 9:00pm – 3:00am at Home The Venue, Sydney',
  keywords: 'MYTHOS, Sydney nightlife, Greek music, European anthems, Home The Venue, VIP table booking, CONTROLLA, KINEZOS',
  authors: [{ name: 'MYTHOS Entertainment' }],
  verification: {
    google: '_bSUsETV80XS12d_O4pxna5Reiw5WRB1VsdTP_OGQYQ',
  },
  openGraph: {
    title: 'MYTHOS - House Meets Heritage',
    description: 'Experience MYTHOS - Sydney\'s modern European nightlife. Friday 19 December, 9:00pm – 3:00am at Home The Venue, Sydney',
    type: 'website',
    url: 'https://mythosentertainment.com.au',
    siteName: 'MYTHOS',
    images: [
      {
        url: '/Mythos Branding/Mythos-o no bg.png',
        width: 548,
        height: 548,
        alt: 'MYTHOS Logo',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'MYTHOS - House Meets Heritage',
    description: 'Experience MYTHOS - Sydney\'s modern European nightlife. Friday 19 December, 9:00pm – 3:00am at Home The Venue, Sydney',
    images: ['/Mythos Branding/Mythos-o no bg.png'],
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
    <html lang="en">
      <head>
        {/* DNS Prefetch for external domains */}
        <link rel="dns-prefetch" href="https://moshtix.com.au" />
        <link rel="dns-prefetch" href="https://formspree.io" />

        {/* Preconnect for critical resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Font loading with display=swap for better performance */}
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@300;400;700;900&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&display=swap" rel="stylesheet" />

        {/* Preload critical assets */}
        <link rel="preload" as="image" href="/Mythos Branding/logo final PMS 876C_cmyk copy.png" />
        <link rel="preload" as="video" href="/Videos/First half.webm" />
        <link rel="preload" as="video" href="/Videos/Second half.webm" />
      </head>
      <body>{children}</body>
    </html>
  )
}
