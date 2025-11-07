# MYTHOS Landing Page

A sophisticated Next.js landing page for MYTHOS, an upscale Sydney clubbing event featuring Mediterranean-inspired design and modern European nightlife.

## Event Details

- **Date:** Friday 19 December
- **Time:** 9:00pm – 3:00am
- **Venue:** TBA
- **Age:** 18+ Event

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** CSS (with CSS Variables)
- **Deployment:** Vercel

## Features

- Split-screen hero with video backgrounds
- Scroll-triggered logo morphing animation
- Responsive design (desktop, tablet, mobile)
- VIP booking form
- DJ lineup section
- Sponsors showcase
- Atmosphere photos integrated into sections
- Video playback speed controls for testing

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with metadata
│   ├── page.tsx           # Main page component
│   └── globals.css        # Global styles
├── public/                # Static assets
│   ├── Event Photos/      # Compressed event photography
│   ├── Mythos Branding/   # Logo and branding assets
│   └── Videos/            # Background videos (.webm)
├── docs/                  # Documentation and requirements
│   ├── Context            # Client requirements
│   ├── debug/             # Debug logs
│   └── ss for context/    # Screenshots for reference
├── next.config.js         # Next.js configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Dependencies

```

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build

```bash
npm run build
```

### Deploy

This project is configured for automatic deployment on Vercel. Push to the master branch to trigger a deployment.

## Design System

### Colors

- **Terracotta:** `#A67B5B`
- **Cream:** `#D4C4B0`
- **Gold:** `#D4A574`
- **Dark Terracotta:** `#8B6543`
- **Light Cream:** `#E8DFD0`

### Typography

- **Headings:** Playfair Display
- **Body:** Cormorant Garamond

## License

All rights reserved - MYTHOS Event

---

🤖 Generated with [Claude Code](https://claude.com/claude-code)
