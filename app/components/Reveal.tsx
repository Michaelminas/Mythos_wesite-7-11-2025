'use client'
import { useEffect } from 'react'

export default function Reveal() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return
        entry.target.animate([{ opacity: 0, transform: 'translateY(24px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 1200, easing: 'cubic-bezier(.2,.7,.2,1)' })
        observer.unobserve(entry.target)
      })
    }, { threshold: 0.12 })
    document.querySelectorAll('[data-reveal]').forEach(element => observer.observe(element))
    return () => observer.disconnect()
  }, [])
  return null
}
