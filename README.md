# MYTHOS Landing Page

A sophisticated Next.js landing page for MYTHOS - Sydney's premier modern European nightlife event featuring Mediterranean-inspired design and elegant aesthetics.

## Event Details

- **Date:** Friday 29 May 2026
- **Time:** 7:30pm – Late
- **Venue:** Cafe Del Mar, Darling Harbour, Sydney
- **Occasion:** VIVID Sydney rooftop party
- **Age:** 18+ Event

## Live Site

🌐 **[View Live Site](https://mythos-sydney.vercel.app)**

## Features

### User Experience
- **Immersive Hero Section** - Split-screen video backgrounds with smooth logo morphing animation
- **Live Countdown Timer** - Real-time countdown to event start with dynamic button states
- **VIP Table Bookings** - Fully functional booking form integrated with Formspree
- **Responsive Design** - Optimized for all devices (320px to 4K displays)

### Technical Highlights
- **Performance Optimized** - 73% media compression (37.5MB → 10.1MB)
- **SEO Ready** - robots.txt, sitemap.xml, Open Graph metadata
- **Fast Loading** - Lazy loading, preloading, and optimized images
- **Accessibility** - ARIA labels, proper semantic HTML, touch-friendly targets
- **Production Ready** - Static export, optimized build

## Tech Stack

- **Framework:** Next.js 14.0.4 (App Router with Static Export)
- **Language:** TypeScript 5.3.3
- **Styling:** Tailwind CSS 3.4.0
- **Fonts:** Helvetica Neue, Playfair Display, Cormorant Garamond
- **Deployment:** Vercel
- **Form Backend:** Formspree

## Performance Metrics

- **Bundle Size:** 94.3 kB First Load JS
- **Mobile Video:** 6.8MB (compressed from 20MB)
- **Images:** Optimized WebP format (80%+ compression)
- **Total Media:** 10.1MB (saved 27.4MB)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build for Production

```bash
npm run build
```

This generates a static export in the `out/` directory.

### Deploy

This project is configured for automatic deployment on Vercel:

1. Push to `master` branch
2. Vercel automatically builds and deploys
3. Live site updates in ~2 minutes

## Project Structure

```
├── app/
│   ├── layout.tsx              # Root layout with SEO metadata
│   ├── page.tsx                # Main landing page component
│   └── globals.css             # Global styles and animations
├── public/
│   ├── Event Photos/Webp/      # Optimized event photography
│   ├── Mythos Branding/        # Logo and branding assets
│   ├── Sponsors/               # Sponsor logos
│   ├── Videos/                 # Compressed background videos
│   ├── robots.txt              # SEO crawler instructions
│   └── sitemap.xml             # Site structure for search engines
├── docs/                       # Project documentation
├── next.config.js              # Next.js configuration
├── tailwind.config.ts          # Tailwind customization
└── package.json                # Dependencies
```

## Design System

### Color Palette

- **Beige:** `#dfd5c8` - Primary background
- **Bronze:** `#96694c` - Accent and CTAs
- **White/Cream:** Text and overlays

### Typography

- **Headings:** Helvetica Neue Bold (uppercase, wide tracking)
- **Body Text:** Helvetica Neue Regular
- **Dates/Times:** Cormorant Garamond Light
- **Branding:** Playfair Display

### Responsive Breakpoints

- **Desktop:** 1200px+
- **Tablet:** 600px - 1199px
- **Mobile:** 320px - 599px
- **Small Mobile:** 375px, 320px (optimized)

## Form Integration

VIP booking form submissions are sent to:
- **Service:** Formspree (mnnlajzz)
- **Email:** mythosgreekentertainment@gmail.com
- **Features:** Spam protection, submission archive, email notifications

## Social Media

- **Instagram:** [@mythos.syd](https://www.instagram.com/mythos.syd/)
- **TikTok:** [@mythos.syd](https://www.tiktok.com/@mythos.syd)
- **Facebook:** [MYTHOS Sydney](https://www.facebook.com/profile.php?id=61571632207446)

## Ticket Sales

**[Get Tickets](https://www.eventbrite.com/e/1987109182055?aff=oddtdtcreator)** via Eventbrite

## Support

For technical issues or questions, please contact the development team.

## License

All rights reserved © 2025 MYTHOS Entertainment

---

🤖 Built with [Claude Code](https://claude.com/claude-code)
