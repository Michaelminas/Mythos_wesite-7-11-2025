'use client'

import { useState, type FormEvent } from 'react'
import styles from '../refresh.module.css'

export default function VipForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === 'sending') return
    const form = event.currentTarget
    setStatus('sending')
    try {
      const response = await fetch('https://formspree.io/f/xdkynlwj', {
        method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' },
      })
      if (!response.ok) throw new Error('Unable to send')
      form.reset()
      setStatus('success')
    } catch { setStatus('error') }
  }
  return (
    <form onSubmit={submit} action="https://formspree.io/f/xdkynlwj" method="POST" className={styles.form}>
      <input type="hidden" name="event" value="MYTHOS White Boat Party — SEADECK, 27 November 2026" />
      <div className={styles.fields}>
        <label>Full name<input name="name" autoComplete="name" required maxLength={120} /></label>
        <label>Email address<input name="email" type="email" autoComplete="email" required /></label>
        <label>Phone number<input name="phone" type="tel" autoComplete="tel" required /></label>
        <label>Number of guests<input name="guests" type="number" min="1" step="1" required /></label>
      </div>
      <label>Anything else? <span>(optional)</span><textarea name="message" rows={3} maxLength={2000} /></label>
      <button className={styles.button} disabled={status === 'sending'}>{status === 'sending' ? 'Sending enquiry…' : 'Enquire about VIP'}</button>
      <p className={styles.formNote}>An enquiry is not a confirmed booking. Our team will be in touch.</p>
      <div role="status" aria-live="polite">
        {status === 'success' && <p>Thank you. Your VIP enquiry has been sent to MYTHOS.</p>}
        {status === 'error' && <p>We couldn’t send your enquiry. Please try again or email <a href="mailto:mythosentertainmentgroup@gmail.com">mythosentertainmentgroup@gmail.com</a>.</p>}
      </div>
    </form>
  )
}
