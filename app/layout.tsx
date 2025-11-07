import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'MYTHOS - An Intimate Odyssey',
  description: 'Experience MYTHOS - Sydney\'s modern European nightlife. Friday 19 December, 9:00pm – 3:00am',
  icons: {
    icon: '/Mythos Branding/Mythos-o no bg.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@300;400;700;900&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}
