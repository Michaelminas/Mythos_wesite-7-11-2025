'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import './globals.css'

export default function Home() {
  useEffect(() => {
    // Slow down hero videos
    const heroVideos = document.querySelectorAll('.hero-split video') as NodeListOf<HTMLVideoElement>
    heroVideos.forEach((video, index) => {
      if (index === 0) {
        video.playbackRate = 0.75 // Left video - 75% speed
      } else {
        video.playbackRate = 0.5 // Right video - 50% speed (much slower)
      }
    })

    // Seamless logo morph from center to sticky header
    const heroContent = document.getElementById('heroContent')
    const fixedTicketsBtn = document.querySelector('.fixed-tickets-btn')

    const handleScroll = () => {
      const scrollY = window.scrollY
      const heroHeight = window.innerHeight

      // Transition happens over first 60vh of scroll
      const transitionEnd = heroHeight * 0.6
      const scrollPercent = Math.min(scrollY / transitionEnd, 1)

      // Calculate target position (top of screen where sticky header sits)
      const startY = 0 // Starts at center (0 offset from center)
      const targetY = -(heroHeight / 2 - 80) // Move up to 80px from top (more padding)
      const currentY = startY + (targetY * scrollPercent)

      // Calculate scale transformation
      const startScale = 1
      const endScale = 0.35 // Bigger sticky header size
      const currentScale = startScale - ((startScale - endScale) * scrollPercent)

      // Apply smooth transform to hero content
      if (heroContent) {
        heroContent.style.transform = `translate(-50%, -50%) translateY(${currentY}px) scale(${currentScale})`
      }

      // Fade out date, time, and CTA faster (by 40% scroll)
      const infoFadePercent = Math.min(scrollY / (transitionEnd * 0.4), 1)
      const dateElements = heroContent?.querySelectorAll('.hero-date, .hero-time, .hero-cta')
      dateElements?.forEach((el) => {
        const element = el as HTMLElement
        element.style.opacity = (1 - infoFadePercent).toString()
        element.style.pointerEvents = infoFadePercent > 0.5 ? 'none' : 'all'
      })

      // At 80% transition, change logo color and show button (no pill)
      if (scrollPercent > 0.8) {
        heroContent?.classList.add('sticky-mode')
        fixedTicketsBtn?.classList.add('visible')
      } else {
        heroContent?.classList.remove('sticky-mode')
        fixedTicketsBtn?.classList.remove('visible')
      }
    }

    window.addEventListener('scroll', handleScroll)

    // Scroll reveal animation for content sections
    const revealElements = document.querySelectorAll('.reveal')

    const revealOnScroll = () => {
      revealElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top
        const elementBottom = element.getBoundingClientRect().bottom

        if (elementTop < window.innerHeight * 0.85 && elementBottom > 0) {
          element.classList.add('active')
        }
      })
    }

    window.addEventListener('scroll', revealOnScroll)
    revealOnScroll() // Initial check

    // Atmosphere images reveal on scroll (in sections)
    const atmosphereImages = document.querySelectorAll('.atmosphere-img')

    const revealAtmosphereImages = () => {
      atmosphereImages.forEach((img) => {
        const rect = img.getBoundingClientRect()
        const isVisible = rect.top < window.innerHeight * 0.8 && rect.bottom > 0

        if (isVisible) {
          img.classList.add('visible')
        }
      })
    }

    window.addEventListener('scroll', revealAtmosphereImages)
    revealAtmosphereImages() // Initial check

    // Video speed slider controls
    const leftSpeedSlider = document.getElementById('leftSpeedSlider') as HTMLInputElement
    const rightSpeedSlider = document.getElementById('rightSpeedSlider') as HTMLInputElement
    const leftSpeedValue = document.getElementById('leftSpeedValue')
    const rightSpeedValue = document.getElementById('rightSpeedValue')

    if (leftSpeedSlider && rightSpeedSlider) {
      leftSpeedSlider.addEventListener('input', (e) => {
        const speed = parseFloat((e.target as HTMLInputElement).value)
        if (heroVideos[0]) heroVideos[0].playbackRate = speed
        if (leftSpeedValue) leftSpeedValue.textContent = speed.toFixed(1) + 'x'
      })

      rightSpeedSlider.addEventListener('input', (e) => {
        const speed = parseFloat((e.target as HTMLInputElement).value)
        if (heroVideos[1]) heroVideos[1].playbackRate = speed
        if (rightSpeedValue) rightSpeedValue.textContent = speed.toFixed(1) + 'x'
      })
    }

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('scroll', revealOnScroll)
      window.removeEventListener('scroll', revealAtmosphereImages)
    }
  }, [])

  return (
    <>
      {/* Background elements */}
      <div className="bg-circles"></div>
      <div className="spotlight" id="spotlight"></div>

      {/* Fixed Get Tickets Button */}
      <a href="https://moshtix.com.au/placeholder" target="_blank" rel="noopener noreferrer" className="fixed-tickets-btn magnetic">
        Get Tickets
      </a>

      {/* Video Speed Testing Controls */}
      <div className="video-speed-controls">
        <h4>Video Speed Test</h4>
        <div className="speed-control">
          <label>
            Left Video: <span className="speed-value" id="leftSpeedValue">0.75x</span>
          </label>
          <input type="range" id="leftSpeedSlider" min="0.1" max="2" step="0.1" defaultValue="0.75" />
        </div>
        <div className="speed-control">
          <label>
            Right Video: <span className="speed-value" id="rightSpeedValue">0.5x</span>
          </label>
          <input type="range" id="rightSpeedSlider" min="0.1" max="2" step="0.1" defaultValue="0.5" />
        </div>
      </div>

      {/* Hero Section - Split Screen */}
      <section className="hero">
        {/* Left Panel */}
        <div className="hero-split">
          <video
            autoPlay
            loop
            muted
            playsInline
            webkit-playsinline="true"
            preload="auto"
          >
            <source src="/Videos/First half.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>
          <div className="hero-overlay"></div>
        </div>

        {/* Right Panel */}
        <div className="hero-split">
          <video
            autoPlay
            loop
            muted
            playsInline
            webkit-playsinline="true"
            preload="auto"
          >
            <source src="/Videos/Second half.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>
          <div className="hero-overlay"></div>
        </div>

        {/* Centered Content Overlay */}
        <div className="hero-content" id="heroContent">
          <Image
            src="/Mythos Branding/logo final PMS 876C_cmyk copy.png"
            alt="MYTHOS"
            className="hero-logo-img"
            width={500}
            height={180}
            priority
          />
          <div className="hero-date">Friday 19 December</div>
          <div className="hero-time">9:00pm – 3:00am | VENUE</div>
          <a href="https://moshtix.com.au/placeholder" target="_blank" rel="noopener noreferrer" className="hero-cta">
            Get Tickets
          </a>
        </div>
      </section>

      {/* Event Details Section */}
      <section className="experience reveal section-atmosphere">
        <div className="atmosphere-img atmosphere-left">
          <Image src="/Event Photos/Compressed/0N6A0662 (1)-min.jpg" alt="" fill style={{ objectFit: 'cover' }} />
        </div>
        <div className="content-wrapper">
          <h2>Event Details</h2>
          <p>
            After a sold-out event, Mythos is taking over VENUE this summer for the next chapter of Sydney&apos;s modern European nightlife.
          </p>
          <p>
            Experience live Greek music, European anthems, and high-energy performances from dancers and live acts. Every set blends the best of Europe and Greece, creating a night built for rhythm, energy, and connection.
          </p>
          <p>
            Join us for a full sensory takeover with world-class sound, lighting, and production that defines the Mythos experience.
          </p>
        </div>
      </section>

      {/* Lineup Section */}
      <section className="three-sounds reveal section-atmosphere">
        <div className="atmosphere-img atmosphere-right">
          <Image src="/Event Photos/Compressed/0N6A0675-min.jpg" alt="" fill style={{ objectFit: 'cover' }} />
        </div>
        <div className="atmosphere-img atmosphere-center-left">
          <Image src="/Event Photos/Compressed/0N6A0704-min.jpg" alt="" fill style={{ objectFit: 'cover' }} />
        </div>
        <div className="content-wrapper">
          <h2>Lineup</h2>
          <div className="sound-cards">
            <div className="sound-card magnetic">
              <div className="time">DJ</div>
              <h3>DJ 1</h3>
              <p>Bringing European anthems and high-energy beats to the dance floor</p>
            </div>
            <div className="sound-card magnetic">
              <div className="time">DJ</div>
              <h3>DJ 2</h3>
              <p>Mixing the best of Greek and European sounds for an unforgettable night</p>
            </div>
            <div className="sound-card magnetic">
              <div className="time">DJ</div>
              <h3>DJ 3</h3>
              <p>Delivering modern beats that celebrate cultural fusion</p>
            </div>
          </div>
          <div className="live-entertainment">
            <h3>Plus Live Entertainment</h3>
            <p>Featuring dancers, live acts, and performances throughout the night</p>
          </div>
        </div>
      </section>

      {/* VIP Bookings Section */}
      <section className="tickets reveal section-atmosphere" id="tickets">
        <div className="atmosphere-img atmosphere-right">
          <Image src="/Event Photos/Compressed/0N6A0814-min.jpg" alt="" fill style={{ objectFit: 'cover' }} />
        </div>
        <div className="atmosphere-img atmosphere-bottom-left">
          <Image src="/Event Photos/Compressed/0N6A0817 (1)-min.jpg" alt="" fill style={{ objectFit: 'cover' }} />
        </div>
        <div className="content-wrapper">
          <h2>VIP Bookings</h2>
          <div className="vip-form-container">
            <form className="vip-form" action="mailto:your-email@example.com" method="post" encType="text/plain">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input type="text" id="name" name="name" autoComplete="name" required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" name="email" autoComplete="email" required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input type="tel" id="phone" name="phone" autoComplete="tel" required />
                </div>
                <div className="form-group">
                  <label htmlFor="guests">Number of Guests</label>
                  <input type="number" id="guests" name="guests" min="1" autoComplete="off" required />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="message">Special Requests</label>
                <textarea id="message" name="message" rows={4} autoComplete="off"></textarea>
              </div>
              <button type="submit" className="submit-btn magnetic">Submit VIP Booking</button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="footer-logo">MYTHOS</div>
        <div className="footer-tagline">An Intimate Odyssey</div>

        {/* Sponsors in Footer */}
        <div className="footer-sponsors">
          <h3>In Partnership With</h3>
          <div className="sponsor-logos">
            <div className="sponsor-logo">
              <div className="logo-placeholder">SPONSOR 1</div>
            </div>
            <div className="sponsor-logo">
              <div className="logo-placeholder">SPONSOR 2</div>
            </div>
            <div className="sponsor-logo">
              <div className="logo-placeholder">SPONSOR 3</div>
            </div>
            <div className="sponsor-logo">
              <div className="logo-placeholder">SPONSOR 4</div>
            </div>
          </div>
        </div>

        <div className="social-links">
          <a href="#" className="magnetic">Instagram</a>
          <a href="#" className="magnetic">Facebook</a>
          <a href="#" className="magnetic">Contact</a>
        </div>
        <div className="age-restriction">18+ EVENT</div>
      </footer>
    </>
  )
}
