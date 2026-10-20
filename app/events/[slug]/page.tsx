import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { pastEvents, photoDetails } from '../../events-data'
import { TICKET_URL } from '../../config'
import styles from '../../refresh.module.css'
import AlbumGallery from '../../components/AlbumGallery'

export function generateStaticParams() { return pastEvents.map(({slug}) => ({slug})) }
export const dynamicParams = false
export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const event = pastEvents.find(item => item.slug === params.slug)
  if (!event) return {}
  const title = `MYTHOS at ${event.venue} | ${event.date}`
  const description = `Photos from MYTHOS at ${event.venue}, ${event.date}. ${event.edition}. Explore the MYTHOS event archive.`
  return { title, description, alternates: { canonical: `/events/${event.slug}/` }, openGraph: { title, description, url: `/events/${event.slug}/`, images: [{url: `/events/${event.cover}.webp`, alt: title}] }, twitter: {card: 'summary_large_image', title, description, images: [`/events/${event.cover}.webp`] } }
}
export default function EventPage({ params }: { params: { slug: string } }) {
  const event = pastEvents.find(item => item.slug === params.slug)
  if (!event) notFound()
  return <div className={styles.site}>
    <a className={styles.skip} href="#archive-main">Skip to content</a>
    <header className={styles.header}><Link href="/" className={styles.logo} aria-label="MYTHOS home"><Image src="/mythos-branding/logo-final.png" alt="MYTHOS" width={250} height={36} /></Link><nav aria-label="Main navigation"><Link href="/#past-events">Back</Link><Link href="/#vip">VIP Tables</Link></nav><a href={TICKET_URL} className={styles.smallButton}>Next event tickets</a></header>
    <main id="archive-main"><div className={styles.archiveHero}><Link href="/#past-events" className={styles.backLink}>Back to the archive</Link><p className={styles.eyebrow}>The MYTHOS archive · {event.edition}</p><h1>{event.venue}</h1><p><time dateTime={event.iso}>{event.date}</time> · Sydney</p></div><AlbumGallery photos={event.images.map(id => ({ id, ...photoDetails[id] }))} venue={event.venue} date={event.date} /><section className={styles.closing}><p className={styles.eyebrow}>The next chapter · 27 November 2026</p><h2>MEET US<br />ON SEADECK.</h2><a href={TICKET_URL} className={styles.button}>Get tickets</a></section></main><footer className={styles.footer}><Link href="/">MYTHOS · House meets heritage.</Link><div><a href="https://www.instagram.com/mythos.syd/">Instagram</a><a href="mailto:help@mythosentertainment.com.au">Contact</a></div></footer>
  </div>
}
