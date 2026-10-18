import type { Viewport } from 'next';
export const viewport: Viewport = { width: 'device-width', initialScale: 1, maximumScale: 5, viewportFit: 'cover', themeColor: '#e8e1d6' };
export default function PlanningLayout({ children }: { children: React.ReactNode }) { return children; }
