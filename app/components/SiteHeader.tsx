'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { TICKET_URL } from '../config'
import styles from '../refresh.module.css'

export default function SiteHeader({ overlay = false }: { overlay?: boolean }) {
  const header = useRef<HTMLElement>(null)
  useEffect(() => {
    if (!overlay) return
    const hero = document.getElementById('event-hero')
    if (!hero || !header.current) return
    let frame = 0
    const update = () => {
      frame = 0
      const heroBottom = hero.getBoundingClientRect().bottom
      document.documentElement.toggleAttribute('data-event-hero-passed', heroBottom <= 0)
      const distance = heroBottom - (header.current?.offsetHeight ?? 90)
      const shrinkProgress = Math.max(0, Math.min(1, (hero.offsetHeight - heroBottom) / Math.max(1, hero.offsetHeight * 0.7)))
      header.current?.style.setProperty('--header-expansion', (1 - shrinkProgress).toFixed(3))
      const opacity = Math.max(0, Math.min(1, 1 - distance / 180))
      header.current?.style.setProperty('--header-opacity', opacity.toFixed(3))
    }
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      window.cancelAnimationFrame(frame)
      document.documentElement.removeAttribute('data-event-hero-passed')
    }
  }, [overlay])
  return <header ref={header} className={`${styles.header} ${overlay ? styles.overlayHeader : ''}`}>
    <Link href="/" aria-label="MYTHOS home" className={styles.logo}><Image src="/mythos-branding/logo-final.png" alt="MYTHOS" width={250} height={36} priority /></Link>
    <nav aria-label="Main navigation"><Link href="/#next-event">Next event</Link><Link href="/#past-events">Past events</Link><Link href="/#vip">VIP</Link><a href="https://mythos-wesite-7-11-2025-git-myt-0cf43c-mythos-projects-fac54b0d.vercel.app/planning" className={styles.planningLink}>Plan your event</a></nav>
    <a href={TICKET_URL} className={styles.smallButton}>Get tickets</a>
  </header>
}
