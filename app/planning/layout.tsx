import './planning.css';
import type { Metadata } from 'next';
import type { Viewport } from 'next';
export const metadata: Metadata = { title: 'MYTHOS Planning | Event Planning in Sydney', description: 'Stress-free event planning for weddings, christenings, school formals, private parties and celebrations in Sydney.', alternates: { canonical: '/planning/' }, openGraph: { title: 'MYTHOS Planning | Event Planning in Sydney', description: 'Thoughtfully organised occasions, made personal. Plan your next event with MYTHOS.', url: 'https://www.mythosentertainment.com.au/planning/' }, twitter: { title: 'MYTHOS Planning | Event Planning in Sydney', description: 'Stress-free event planning in Sydney.' } };
export const viewport: Viewport = { width: 'device-width', initialScale: 1, maximumScale: 5, viewportFit: 'cover', themeColor: '#e8e1d6' };
export default function PlanningLayout({ children }: { children: React.ReactNode }) { return children; }
