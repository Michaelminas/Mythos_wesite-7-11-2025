'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import styles from '../refresh.module.css'

export default function HeroImage() {
  const image = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const element = image.current
    const hero = element?.closest('section')
    if (!element || !hero) return
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0
    let position = 0
    let previousTime = 0

    const animate = (time: number) => {
      frame = 0
      const bounds = hero.getBoundingClientRect()
      const target = reducedMotion.matches ? 0 : Math.max(0, Math.min(bounds.height, -bounds.top)) * 0.28
      const elapsed = previousTime ? Math.min(time - previousTime, 64) : 16
      previousTime = time
      position += (target - position) * (1 - Math.exp(-elapsed / 85))
      if (Math.abs(target - position) < 0.1) position = target
      position = Math.min(position, Math.max(0, -bounds.top))
      element.style.transform = `translate3d(0, ${position.toFixed(2)}px, 0)`
      if (position !== target) frame = window.requestAnimationFrame(animate)
      else previousTime = 0
    }
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(animate)
    }
    const reset = () => {
      window.cancelAnimationFrame(frame)
      frame = 0
      position = 0
      previousTime = 0
      element.style.transform = 'none'
      if (!reducedMotion.matches) schedule()
    }
    schedule()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    reducedMotion.addEventListener('change', reset)
    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      reducedMotion.removeEventListener('change', reset)
    }
  }, [])

  return <Image ref={image} src="/seadeck/white-boat-party-ocean.webp" alt="" fill priority sizes="100vw" className={styles.heroImage} />
}
