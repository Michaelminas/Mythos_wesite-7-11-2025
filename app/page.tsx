import Image from 'next/image'
import Link from 'next/link'
import { TICKET_URL } from './config'
import { pastEvents } from './events-data'
import VipForm from './components/VipForm'
import Reveal from './components/Reveal'
import SiteHeader from './components/SiteHeader'
import styles from './refresh.module.css'

const event = {
  '@context': 'https://schema.org', '@type': 'MusicEvent', name: 'MYTHOS | WHITE BOAT PARTY | SEADECK',
  description: 'Greek, Eurohouse and Ibiza anthems aboard SEADECK on Sydney Harbour. The theme is WHITE.',
  startDate: '2026-11-27T19:45:00+11:00', endDate: '2026-11-27T23:45:00+11:00',
  eventStatus: 'https://schema.org/EventScheduled', eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  location: { '@type': 'Place', name: 'SEADECK — King Street Wharf 9', address: { '@type': 'PostalAddress', streetAddress: 'King Street Wharf 9, Lime Street', addressLocality: 'Sydney', addressRegion: 'NSW', postalCode: '2000', addressCountry: 'AU' } },
  image: 'https://www.mythosentertainment.com.au/mythos-branding/mythos-o-no-bg.png',
  organizer: { '@type': 'Organization', name: 'MYTHOS Entertainment', url: 'https://www.mythosentertainment.com.au' },
  offers: { '@type': 'Offer', url: TICKET_URL, priceCurrency: 'AUD', availability: 'https://schema.org/InStock' },
}
const faqs = [
  ['When is the next MYTHOS event?', 'Friday 27 November 2026. Arrive at 7:30PM; the event runs from 7:45PM to 11:45PM.'],
  ['Where is the event?', 'Aboard SEADECK on Sydney Harbour, at King Street Wharf 9, Sydney. Check your ticket and the organiser’s updates for boarding instructions.'],
  ['What should I wear?', 'The theme is WHITE. Dress in your best white.'],
  ['What music can I expect?', 'Greek, Eurohouse and Ibiza anthems, with DJs and live acts.'],
  ['How do I enquire about VIP?', 'Send your group details using the VIP form. Our team will contact you about availability and options.'],
]

export default function Home() {
  return <div className={styles.site}>
    <Reveal />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(event) }} />
    <a className={styles.skip} href="#main">Skip to content</a>
    <SiteHeader overlay />
    <main id="main">
      <section id="event-hero" className={styles.hero} aria-labelledby="event-title">
        <Image src="/seadeck/white-boat-party-ocean.webp" alt="" fill priority sizes="100vw" className={styles.heroImage} />
        <div className={styles.heroShade} />
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>MYTHOS PRESENTS · FRIDAY 27 NOVEMBER 2026</p>
          <h1 id="event-title" aria-label="White Boat Party"><span>WHITE</span><span>BOAT PART<span className={styles.partyY}>Y</span></span></h1>
          <div className={styles.heroBottom}>
            <p className={styles.seadeck}>SEADECK</p>
            <p className={styles.heroMeta}>SYDNEY HARBOUR · KING STREET WHARF 9</p>
            <p className={styles.heroTiming}>ARRIVE 7:30PM <span>EVENT 7:45PM — 11:45PM</span></p>
            <a href={TICKET_URL} className={styles.button}>Get tickets</a>
          </div>
        </div>
        <div className={styles.heroFoot}><span>House meets heritage.</span><a href="#next-event">Explore SEADECK</a></div>
      </section>
      <section id="next-event" className={`${styles.section} ${styles.eventSection}`}>
        <div data-reveal className={styles.eventIntro}><p className={styles.eyebrow}>MYTHOS ON THE HARBOUR</p><h2>THE NIGHT.<br />THE HARBOUR.<br />SEADECK.</h2><p>Our next chapter takes us aboard SEADECK. Greek, Eurohouse and Ibiza anthems, DJs and live acts, with Sydney’s skyline as the backdrop.</p><p>The theme is WHITE. Bring your people. We’ll bring the MYTHOS energy.</p><a href={TICKET_URL} className={styles.button}>Get tickets</a></div>
        <div data-reveal className={styles.eventCard}><div className={styles.cardTop}><span>FRIDAY 27 NOVEMBER 2026</span><Image src="/mythos-branding/mythos-o-no-bg.png" width={48} height={48} alt="" /></div><h3>WHITE<br />BOAT PARTY</h3><p className={styles.cardVenue}>SEADECK</p><dl><div><dt>Arrival</dt><dd>7:30PM</dd></div><div><dt>Event</dt><dd>7:45PM — 11:45PM</dd></div><div><dt>Location</dt><dd>King Street Wharf 9<br />Darling Harbour, Sydney</dd></div><div><dt>Theme</dt><dd>White</dd></div></dl><a href={TICKET_URL} className={styles.button}>Get tickets</a></div>
      </section>
      <section className={styles.vesselSection}>
        <figure data-reveal className={styles.vesselPhoto}><Image src="/seadeck/seadeck-exterior.webp" alt="SEADECK’s open-air decks and blue hull on Sydney Harbour" width={1800} height={1200} sizes="(max-width: 700px) 100vw, 65vw" /><figcaption>YOUR VENUE FOR THE NIGHT · SEADECK</figcaption></figure>
        <div data-reveal className={styles.vesselCopy}><p className={styles.eyebrow}>A NEW SETTING. THE SAME MYTHOS.</p><h2>TAKE IT <br />TO THE <br />WATER.</h2><p>Open-air decks. Harbour views. A night of music on the water.</p><a href={TICKET_URL} className={styles.button}>Get tickets</a><details className={styles.posterDetails}><summary>View the event poster</summary><Image src="/seadeck/white-boat-party-poster.webp" alt="MYTHOS White Boat Party poster: SEADECK, Friday 27 November, event 7:45PM to 11:45PM, arrive 7:30PM, King Street Wharf 9 Darling Harbour" width={1132} height={1600} sizes="(max-width: 700px) 85vw, 30vw" /></details></div>
      </section>
      <section className={`${styles.section} ${styles.experience}`}>
        <div data-reveal className={styles.sectionHeading}><div><p className={styles.eyebrow}>This is MYTHOS</p><h2>YOU HAD TO<br />BE THERE.</h2></div><p>Live music. Hands in the air.<br />A room that moves as one.</p></div>
        <div className={styles.photoGrid}><figure data-reveal><Image src="/events/aura-live.webp" width={1200} height={800} alt="Live bouzouki performance among the crowd at AURA" sizes="(max-width: 700px) 100vw, 56vw" /><figcaption>AURA · August 2025</figcaption></figure><figure data-reveal><Image src="/events/pelicano-portrait.webp" width={800} height={1200} alt="A guest dancing at the PELICANO rooftop edition" sizes="(max-width: 700px) 100vw, 32vw" /><figcaption>PELICANO ROOFTOP · May 2026</figcaption></figure><figure data-reveal><Image src="/events/home-live.webp" width={1200} height={801} alt="Live performers on the MYTHOS stage at HOME THE VENUE" sizes="(max-width: 700px) 100vw, 56vw" /><figcaption>HOME THE VENUE · December 2025</figcaption></figure></div>
      </section>
      <section id="past-events" className={`${styles.section} ${styles.archive}`}>
        <div data-reveal className={styles.sectionHeading}><div><p className={styles.eyebrow}>The archive</p><h2>NIGHTS THAT<br />MADE MYTHOS.</h2></div><p>Four chapters.<br />One unmistakable energy.</p></div>
        <div className={styles.archiveGrid}>{pastEvents.map((item) => <Link data-reveal href={`/events/${item.slug}/`} className={styles.archiveCard} key={item.slug}><div className={styles.archiveImage}><Image src={`/events/${item.cover}.webp`} alt={`MYTHOS crowd at ${item.venue}, ${item.date}`} fill sizes="(max-width: 700px) 100vw, 45vw" /><span className={styles.viewPhotos}>View photos</span></div><div className={styles.archiveCaption}><div><h3>{item.venue}</h3><p>{item.edition}</p></div><time dateTime={item.iso}>{item.date}</time></div></Link>)}</div>
      </section>
      <section id="vip" className={`${styles.section} ${styles.vip}`}><div data-reveal><p className={styles.eyebrow}>Make it your night</p><h2>YOUR PEOPLE.<br />YOUR MYTHOS.</h2><p>Bring your group aboard. Enquire about VIP options for the White Boat Party and we’ll help you plan the night.</p></div><VipForm /></section>
      <section className={`${styles.section} ${styles.faq}`}><div><p className={styles.eyebrow}>Before you join us</p><h2>THE DETAILS.</h2></div><div>{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}<p className={styles.policyNote}>For current ticket availability and ticket terms, <a href={TICKET_URL}>visit the official Eventbrite listing</a>.</p></div></section>
      <section className={styles.closing} data-reveal><p className={styles.eyebrow}>Friday 27 November · SEADECK</p><h2>SEE YOU<br />ON THE HARBOUR.</h2><a href={TICKET_URL} className={styles.button}>Get tickets </a></section>
      <section className={styles.sponsors} aria-label="Sponsors"><p>With the support of</p><a href="https://www.bayvista.com.au/" aria-label="Bay Vista"><Image src="/Sponsors/bayvista-logo.png" alt="Bay Vista" width={120} height={60} /></a><a href="https://www.nieosgrille.com.au/" aria-label="Nieo’s Grille"><Image src="/Sponsors/nieos-grille-logo.png" alt="Nieo’s Grille" width={120} height={60} /></a></section>
    </main>
    <footer className={styles.footer}><Image src="/mythos-branding/logo-final.png" alt="MYTHOS" width={250} height={36} /><p>House meets heritage. Sydney, Australia.</p><div><a href="https://www.instagram.com/mythos.syd/">Instagram</a><a href="https://www.tiktok.com/@mythos.syd">TikTok</a><a href="https://www.facebook.com/profile.php?id=61571632207446">Facebook</a><a href="mailto:planning@mythosentertainment.com.au">Contact</a></div><small>© {new Date().getFullYear()} MYTHOS Entertainment</small></footer>
    <div className={styles.mobileTickets}><span>27 NOV · SEADECK</span><a href={TICKET_URL}>Get tickets</a></div>
  </div>
}
