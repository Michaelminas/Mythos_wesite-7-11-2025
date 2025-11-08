'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import './globals.css'

export default function Home() {
  const [countdown, setCountdown] = useState('')
  const [eventStatus, setEventStatus] = useState<'upcoming' | 'live' | 'ended'>('upcoming')
  const [isMuted, setIsMuted] = useState(true)
  const [formSubmitted, setFormSubmitted] = useState(false)

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)

    const name = formData.get('name')
    const email = formData.get('email')
    const phone = formData.get('phone')
    const guests = formData.get('guests')
    const message = formData.get('message')

    const subject = `VIP Booking Request - ${name}`
    const body = `
Name: ${name}
Email: ${email}
Phone: ${phone}
Number of Guests: ${guests}
Special Requests: ${message}
    `.trim()

    const mailtoLink = `mailto:vip@mythos.syd?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.location.href = mailtoLink

    setFormSubmitted(true)
    setTimeout(() => setFormSubmitted(false), 5000)
  }

  // Countdown timer
  useEffect(() => {
    const updateCountdown = () => {
      // Event: Friday 19 December 2025, 9:00pm - 3:00am
      const eventStart = new Date('2025-12-19T21:00:00')
      const eventEnd = new Date('2025-12-20T03:00:00')
      const now = new Date()

      if (now >= eventStart && now <= eventEnd) {
        // Event is happening now
        setEventStatus('live')
        setCountdown('EVENT HAPPENING NOW!')
      } else if (now > eventEnd) {
        // Event has ended
        setEventStatus('ended')
        setCountdown('Event has concluded')
      } else {
        // Event is upcoming - show countdown
        setEventStatus('upcoming')
        const diff = eventStart.getTime() - now.getTime()

        const days = Math.floor(diff / (1000 * 60 * 60 * 24))
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((diff % (1000 * 60)) / 1000)

        if (days > 0) {
          setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`)
        } else if (hours > 0) {
          setCountdown(`${hours}h ${minutes}m ${seconds}s`)
        } else {
          setCountdown(`${minutes}m ${seconds}s`)
        }
      }
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)

    return () => clearInterval(interval)
  }, [])
  useEffect(() => {
    // Set default hero video speeds
    const heroVideos = document.querySelectorAll('.hero-split video') as NodeListOf<HTMLVideoElement>
    heroVideos.forEach((video) => {
      video.playbackRate = 1
    })

    // Aggressive mobile video autoplay with iOS detection
    const tryPlayMobileVideo = () => {
      const mobileVideo = document.querySelector('.mobile-hero-video') as HTMLVideoElement
      if (!mobileVideo) return

      // Detect iOS
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)

      // Set all possible attributes for compatibility
      mobileVideo.setAttribute('playsinline', 'true')
      mobileVideo.setAttribute('webkit-playsinline', 'true')
      mobileVideo.setAttribute('x-webkit-airplay', 'allow')
      mobileVideo.muted = true
      mobileVideo.defaultMuted = true
      mobileVideo.volume = 0

      // For iOS, we need to be even more aggressive
      if (isIOS) {
        mobileVideo.removeAttribute('controls')
        mobileVideo.load()
      }

      // Attempt to play
      const attemptPlay = () => {
        const playPromise = mobileVideo.play()
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log('Mobile video playing successfully')
            })
            .catch((error) => {
              console.log('Autoplay blocked, waiting for user interaction:', error)

              // Add multiple interaction listeners
              const playOnInteraction = () => {
                mobileVideo.muted = true
                mobileVideo.play()
                  .then(() => console.log('Video started after interaction'))
                  .catch((e) => console.log('Failed to play after interaction:', e))
              }

              // Remove listeners after first successful play
              const removeListeners = () => {
                document.removeEventListener('touchstart', playOnInteraction)
                document.removeEventListener('touchmove', playOnInteraction)
                document.removeEventListener('touchend', playOnInteraction)
                document.removeEventListener('click', playOnInteraction)
                document.removeEventListener('scroll', playOnInteraction)
                window.removeEventListener('scroll', playOnInteraction)
              }

              document.addEventListener('touchstart', () => { playOnInteraction(); removeListeners() }, { once: true, passive: true })
              document.addEventListener('touchmove', () => { playOnInteraction(); removeListeners() }, { once: true, passive: true })
              document.addEventListener('touchend', () => { playOnInteraction(); removeListeners() }, { once: true, passive: true })
              document.addEventListener('click', () => { playOnInteraction(); removeListeners() }, { once: true })
              document.addEventListener('scroll', () => { playOnInteraction(); removeListeners() }, { once: true, passive: true })
              window.addEventListener('scroll', () => { playOnInteraction(); removeListeners() }, { once: true, passive: true })
            })
        }
      }

      // Multiple rapid-fire attempts
      attemptPlay()
      setTimeout(attemptPlay, 100)
      setTimeout(attemptPlay, 300)
      setTimeout(attemptPlay, 600)
      setTimeout(attemptPlay, 1000)
    }

    // Start attempts immediately
    if (typeof window !== 'undefined') {
      tryPlayMobileVideo()

      // Also try when page is fully loaded
      if (document.readyState === 'complete') {
        tryPlayMobileVideo()
      } else {
        window.addEventListener('load', tryPlayMobileVideo)
      }
    }

    // Seamless logo morph from center to sticky header
    const heroContent = document.getElementById('heroContent')
    const fixedTicketsBtn = document.querySelector('.fixed-tickets-btn')

    const handleScroll = () => {
      const scrollY = window.scrollY
      const heroHeight = window.innerHeight
      const transitionEnd = heroHeight * 0.6
      const scrollPercent = Math.min(scrollY / transitionEnd, 1)

      const startY = 0
      const targetY = -(heroHeight / 2 - 80)
      const currentY = startY + (targetY * scrollPercent)

      const startScale = 1
      const endScale = 0.35
      const currentScale = startScale - ((startScale - endScale) * scrollPercent)

      if (heroContent) {
        heroContent.style.transform = `translate(-50%, -50%) translateY(${currentY}px) scale(${currentScale})`
      }

      const infoFadePercent = Math.min(scrollY / (transitionEnd * 0.4), 1)
      const dateElements = heroContent?.querySelectorAll('.hero-date, .hero-time, .hero-countdown, .hero-cta')
      dateElements?.forEach((el) => {
        const element = el as HTMLElement
        element.style.opacity = (1 - infoFadePercent).toString()
        element.style.pointerEvents = infoFadePercent > 0.5 ? 'none' : 'all'
      })

      // Fade out mobile audio button on scroll
      const audioButton = document.querySelector('.mobile-audio-btn') as HTMLElement
      if (audioButton) {
        audioButton.style.opacity = (1 - infoFadePercent).toString()
        audioButton.style.pointerEvents = infoFadePercent > 0.5 ? 'none' : 'all'
      }

      if (scrollPercent > 0.8) {
        heroContent?.classList.add('sticky-mode')
        fixedTicketsBtn?.classList.add('visible')
      } else {
        heroContent?.classList.remove('sticky-mode')
        fixedTicketsBtn?.classList.remove('visible')
      }
    }

    window.addEventListener('scroll', handleScroll)

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
    revealOnScroll()

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
    revealAtmosphereImages()

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
      <div className="fixed w-[600px] h-[600px] bg-gradient-radial from-gold/15 to-transparent pointer-events-none -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 opacity-0 z-[1]" id="spotlight"></div>

      {/* Fixed Get Tickets Button */}
      <a
        href="https://moshtix.com.au/placeholder"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed-tickets-btn fixed top-[30px] right-[30px] z-[1000] px-[35px] py-3 bg-gradient-to-br from-gold to-terracotta text-white no-underline font-playfair font-semibold tracking-[0.2em] text-[0.85rem] uppercase rounded-full shadow-[0_4px_20px_rgba(166,123,91,0.3)] transition-all duration-600 opacity-0 -translate-y-5 pointer-events-none hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(166,123,91,0.5)] hover:bg-gradient-to-br hover:from-terracotta hover:to-gold max-md:top-[50%] max-md:-translate-y-1/2 max-md:right-3 max-md:px-3 max-md:py-1.5 max-md:text-[0.6rem] max-md:tracking-[0.1em]"
      >
        Want a Ticket?
      </a>

      {/* Hero Section - Split Screen */}
      <section className="min-h-screen flex relative overflow-hidden max-md:block">
        {/* Desktop: Split Screen Videos */}
        <div className="hero-split flex-1 relative overflow-hidden max-md:hidden">
          <video autoPlay loop muted playsInline preload="metadata" className="absolute top-0 left-0 w-full h-full object-cover">
            <source src="/Videos/First half.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute top-0 left-0 w-full h-full bg-black/30 z-[1]"></div>
        </div>

        <div className="hero-split flex-1 relative overflow-hidden max-md:hidden">
          <video autoPlay loop muted playsInline preload="metadata" className="absolute top-0 left-0 w-full h-full object-cover">
            <source src="/Videos/Second half.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute top-0 left-0 w-full h-full bg-black/30 z-[1]"></div>
        </div>

        {/* Mobile: Single Full-Screen Video */}
        <div className="hidden max-md:block relative w-full h-screen overflow-hidden bg-black">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute top-0 left-0 w-full h-full object-cover mobile-hero-video"
          >
            <source src="/Videos/website video.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute top-0 left-0 w-full h-full bg-black/30 z-[1]"></div>

          {/* Mobile Audio Toggle Button */}
          <button
            onClick={() => {
              const video = document.querySelector('.mobile-hero-video') as HTMLVideoElement
              if (video) {
                const newMutedState = !isMuted
                video.muted = newMutedState
                video.volume = newMutedState ? 0 : 1
                setIsMuted(newMutedState)

                // Ensure desktop videos are always muted
                const desktopVideos = document.querySelectorAll('.hero-split video') as NodeListOf<HTMLVideoElement>
                desktopVideos.forEach(v => {
                  v.muted = true
                  v.volume = 0
                })

                // Force play in case it was paused
                video.play().catch(() => {
                  console.log('Play blocked')
                })
              }
            }}
            className="mobile-audio-btn absolute top-6 left-6 z-[998] w-12 h-12 rounded-full bg-black/50 backdrop-blur-md border border-gold/40 flex items-center justify-center transition-all duration-300 hover:bg-black/70 hover:border-gold active:scale-90"
            aria-label={isMuted ? 'Unmute video' : 'Mute video'}
          >
            {isMuted ? (
              <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
            )}
          </button>
        </div>

        {/* Centered Content Overlay */}
        <div className="hero-content fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[999] text-center w-full max-w-[1200px] px-10 will-change-transform max-md:px-5" id="heroContent">
          <Image
            src="/Mythos Branding/logo final PMS 876C_cmyk copy.png"
            alt="MYTHOS"
            className="hero-logo-img w-auto h-[clamp(80px,15vw,180px)] mb-10 block mx-auto max-md:h-[clamp(60px,12vw,120px)] max-md:mb-[30px] max-[430px]:h-[clamp(50px,10vw,100px)] max-[430px]:mb-5"
            width={500}
            height={180}
            style={{ width: 'auto', height: 'auto' }}
            priority
          />
          <div className="hero-date font-cormorant text-[clamp(1.2rem,2.5vw,1.8rem)] font-normal tracking-[0.2em] text-white mb-2.5 max-md:text-[0.9rem] max-md:mb-2 max-[430px]:text-[0.85rem] max-[430px]:mb-1.5">
            Friday 19 December
          </div>
          <div className="hero-time font-cormorant text-[clamp(1rem,2vw,1.4rem)] font-light tracking-[0.15em] text-white/90 max-md:text-[0.8rem] max-md:tracking-[0.1em] max-[430px]:text-[0.75rem]">
            9:00pm – 3:00am | VENUE
          </div>

          {/* Countdown Timer */}
          <div className={`hero-countdown font-playfair text-[clamp(1.2rem,2.5vw,1.6rem)] font-bold tracking-[0.2em] mt-4 mb-2 ${
            eventStatus === 'live' ? 'text-gold animate-pulse' :
            eventStatus === 'ended' ? 'text-white/60' :
            'text-white'
          } max-md:text-[1rem] max-[430px]:text-[0.9rem]`}>
            {countdown}
          </div>

          <a
            href="https://moshtix.com.au/placeholder"
            target="_blank"
            rel="noopener noreferrer"
            className={`hero-cta inline-block mt-3 px-[50px] py-[18px] no-underline font-playfair font-semibold tracking-[0.2em] text-base uppercase rounded-full transition-all duration-400 max-md:px-[30px] max-md:py-3 max-md:text-[0.85rem] max-md:tracking-[0.15em] max-md:mt-[15px] max-[430px]:px-[25px] max-[430px]:py-2.5 max-[430px]:text-[0.8rem] max-[430px]:mt-3 ${
              eventStatus === 'live'
                ? 'bg-gradient-to-br from-gold to-terracotta text-white shadow-[0_8px_30px_rgba(212,165,116,0.8)] hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(212,165,116,1)] animate-pulse'
                : eventStatus === 'ended'
                ? 'bg-gray-600 text-white/50 cursor-not-allowed shadow-[0_4px_20px_rgba(0,0,0,0.3)]'
                : 'bg-gradient-to-br from-gold to-terracotta text-white shadow-[0_8px_30px_rgba(166,123,91,0.5)] hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(166,123,91,0.7)]'
            }`}
            {...(eventStatus === 'ended' ? { onClick: (e: React.MouseEvent) => e.preventDefault() } : {})}
          >
            {eventStatus === 'live' ? 'Get Tickets Now!' : eventStatus === 'ended' ? 'Event Ended' : 'Want a Ticket?'}
          </a>
        </div>
      </section>

      {/* Lineup Section */}
      <section className="reveal py-20 px-5 bg-section-dark-bg relative z-[2] opacity-0 translate-y-[50px] transition-all duration-800 max-md:py-[50px] max-[430px]:py-10 max-[430px]:px-[15px]">
        <div className="atmosphere-img absolute w-[700px] h-[800px] opacity-0 transition-all duration-1000 pointer-events-none rounded-[20px] overflow-hidden z-[1] right-[-5%] top-[12%] rotate-[8deg] scale-95 max-[600px]:hidden">
          <Image src="/Event Photos/Compressed/0N6A0675-min.jpg" alt="" fill style={{ objectFit: 'cover' }} loading="eager" />
        </div>
        <div className="atmosphere-img absolute w-[650px] h-[750px] opacity-0 transition-all duration-1000 pointer-events-none rounded-[20px] overflow-hidden z-[1] left-[-8%] bottom-[5%] -rotate-[5deg] scale-95 max-[600px]:hidden">
          <Image src="/Event Photos/Compressed/0N6A0704-min.jpg" alt="" fill style={{ objectFit: 'cover' }} loading="eager" />
        </div>
        <div className="max-w-[1200px] mx-auto px-10 relative z-[2]">
          <h2 className="font-playfair text-[clamp(2.5rem,5vw,4rem)] font-light tracking-[0.2em] text-center mb-20 text-section-dark-text max-md:text-[1.8rem] max-md:mb-[30px] max-md:tracking-[0.15em] max-[430px]:text-[1.5rem] max-[430px]:mb-[25px]">
            Lineup
          </h2>
          <div className="flex justify-between gap-[5%] px-[10%] max-md:flex-col max-md:gap-6 max-md:px-0">
            <div className="flex-1 bg-white/[0.08] backdrop-blur-[10px] p-[50px_35px] rounded-[20px] border border-gold/30 transition-all duration-500 relative overflow-hidden hover:-translate-y-2.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:border-gold before:content-[''] before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-gold/15 before:to-transparent before:transition-all before:duration-800 hover:before:left-full max-md:p-[40px_30px]">
              <div className="font-playfair text-base font-semibold tracking-[0.3em] text-gold uppercase mb-5 max-md:text-sm">DJ</div>
              <h3 className="font-playfair text-[clamp(1.8rem,3vw,2.5rem)] font-bold tracking-[0.1em] mb-5 text-section-dark-text max-md:text-[1.3rem]">DJ 1</h3>
              <p className="text-[1.1rem] leading-[1.8] text-section-dark-text/85 font-light max-md:text-[0.9rem] max-md:leading-[1.6]">Bringing European anthems and high-energy beats to the dance floor</p>
            </div>
            <div className="flex-1 bg-white/[0.08] backdrop-blur-[10px] p-[50px_35px] rounded-[20px] border border-gold/30 transition-all duration-500 relative overflow-hidden hover:-translate-y-2.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:border-gold before:content-[''] before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-gold/15 before:to-transparent before:transition-all before:duration-800 hover:before:left-full max-md:p-[40px_30px]">
              <div className="font-playfair text-base font-semibold tracking-[0.3em] text-gold uppercase mb-5 max-md:text-sm">DJ</div>
              <h3 className="font-playfair text-[clamp(1.8rem,3vw,2.5rem)] font-bold tracking-[0.1em] mb-5 text-section-dark-text max-md:text-[1.3rem]">DJ 2</h3>
              <p className="text-[1.1rem] leading-[1.8] text-section-dark-text/85 font-light max-md:text-[0.9rem] max-md:leading-[1.6]">Mixing the best of Greek and European sounds for an unforgettable night</p>
            </div>
            <div className="flex-1 bg-white/[0.08] backdrop-blur-[10px] p-[50px_35px] rounded-[20px] border border-gold/30 transition-all duration-500 relative overflow-hidden hover:-translate-y-2.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:border-gold before:content-[''] before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-gold/15 before:to-transparent before:transition-all before:duration-800 hover:before:left-full max-md:p-[40px_30px]">
              <div className="font-playfair text-base font-semibold tracking-[0.3em] text-gold uppercase mb-5 max-md:text-sm">DJ</div>
              <h3 className="font-playfair text-[clamp(1.8rem,3vw,2.5rem)] font-bold tracking-[0.1em] mb-5 text-section-dark-text max-md:text-[1.3rem]">DJ 3</h3>
              <p className="text-[1.1rem] leading-[1.8] text-section-dark-text/85 font-light max-md:text-[0.9rem] max-md:leading-[1.6]">Delivering modern beats that celebrate cultural fusion</p>
            </div>
          </div>
          <div className="text-center mt-[60px] p-10 bg-gold/15 rounded-[15px] max-md:mt-10 max-md:p-[30px_20px] max-[430px]:p-[25px_15px]">
            <h3 className="font-playfair text-[clamp(1.5rem,2.5vw,2rem)] font-bold tracking-[0.2em] mb-[15px] text-gold max-[430px]:text-[1.2rem]">Plus Live Entertainment</h3>
            <p className="text-[1.1rem] text-section-dark-text/90 font-light">Featuring dancers, live acts, and performances throughout the night</p>
          </div>
        </div>
      </section>

      {/* Event Details Section */}
      <section className="reveal text-center py-20 px-5 bg-section-light-bg relative z-[2] opacity-0 translate-y-[50px] transition-all duration-800 max-md:py-[50px] max-[430px]:py-10 max-[430px]:px-[15px]">
        <div className="atmosphere-img absolute w-[720px] h-[820px] opacity-0 transition-all duration-1000 pointer-events-none rounded-[20px] overflow-hidden z-[1] left-[-10%] top-[8%] -rotate-[3deg] scale-95 max-[600px]:hidden">
          <Image src="/Event Photos/Compressed/0N6A0662 (1)-min.jpg" alt="" fill style={{ objectFit: 'cover' }} loading="eager" />
        </div>
        <div className="max-w-[1200px] mx-auto px-10 relative z-[2]">
          <h2 className="font-playfair text-[clamp(2.5rem,5vw,4rem)] font-light tracking-[0.2em] mb-10 text-section-light-text max-md:text-[1.8rem] max-md:mb-[30px] max-md:tracking-[0.15em] max-[430px]:text-[1.5rem] max-[430px]:mb-[25px]">
            Event Details
          </h2>
          <p className="text-[clamp(1.1rem,2vw,1.4rem)] leading-[2] max-w-[800px] mx-auto mb-[25px] font-light text-section-light-text max-md:text-base max-md:leading-[1.8] max-md:mb-5 max-[430px]:text-[0.95rem] max-[430px]:leading-[1.7]">
            After a sold-out event, Mythos is taking over VENUE this summer for the next chapter of Sydney&apos;s modern European nightlife.
          </p>
          <p className="text-[clamp(1.1rem,2vw,1.4rem)] leading-[2] max-w-[800px] mx-auto mb-[25px] font-light text-section-light-text max-md:text-base max-md:leading-[1.8] max-md:mb-5 max-[430px]:text-[0.95rem] max-[430px]:leading-[1.7]">
            Experience live Greek music, European anthems, and high-energy performances from dancers and live acts. Every set blends the best of Europe and Greece, creating a night built for rhythm, energy, and connection.
          </p>
          <p className="text-[clamp(1.1rem,2vw,1.4rem)] leading-[2] max-w-[800px] mx-auto mb-[25px] font-light text-section-light-text max-md:text-base max-md:leading-[1.8] max-md:mb-5 max-[430px]:text-[0.95rem] max-[430px]:leading-[1.7]">
            Join us for a full sensory takeover with world-class sound, lighting, and production that defines the Mythos experience.
          </p>
        </div>
      </section>

      {/* VIP Bookings Section */}
      <section className="reveal py-20 px-5 bg-section-dark-bg relative z-[2] opacity-0 translate-y-[50px] transition-all duration-800 max-md:py-[50px] max-[430px]:py-10 max-[430px]:px-[15px]" id="tickets">
        <div className="atmosphere-img absolute w-[680px] h-[780px] opacity-0 transition-all duration-1000 pointer-events-none rounded-[20px] overflow-hidden z-[1] right-[-12%] top-[18%] rotate-[6deg] scale-95 max-[600px]:hidden">
          <Image src="/Event Photos/Compressed/0N6A0814-min.jpg" alt="" fill style={{ objectFit: 'cover' }} loading="eager" />
        </div>
        <div className="atmosphere-img absolute w-[630px] h-[730px] opacity-0 transition-all duration-1000 pointer-events-none rounded-[20px] overflow-hidden z-[1] left-[-6%] bottom-[8%] -rotate-[7deg] scale-95 max-[600px]:hidden">
          <Image src="/Event Photos/Compressed/0N6A0817 (1)-min.jpg" alt="" fill style={{ objectFit: 'cover' }} loading="eager" />
        </div>
        <div className="max-w-[1200px] mx-auto px-10 relative z-[2]">
          <h2 className="font-playfair text-[clamp(2.5rem,5vw,4rem)] font-light tracking-[0.2em] text-center mb-20 text-section-dark-text max-md:text-[1.8rem] max-md:mb-[30px] max-md:tracking-[0.15em] max-[430px]:text-[1.5rem] max-[430px]:mb-[25px]">
            VIP Bookings
          </h2>
          <div className="max-w-[800px] mx-auto bg-white/[0.08] backdrop-blur-[20px] p-[60px_50px] rounded-[25px] border border-gold/30 max-md:p-[35px_20px] max-[430px]:p-[30px_15px]">
            {formSubmitted && (
              <div className="mb-6 p-4 bg-gold/20 border border-gold rounded-lg text-center">
                <p className="text-gold font-playfair tracking-wide">Thank you! Your booking request has been sent.</p>
              </div>
            )}
            <form className="flex flex-col gap-[25px]" onSubmit={handleFormSubmit}>
              <div className="grid grid-cols-2 gap-[25px] max-md:grid-cols-1 max-md:gap-[15px]">
                <div className="flex flex-col gap-2.5">
                  <label htmlFor="name" className="font-playfair text-[0.95rem] font-semibold tracking-[0.1em] text-section-dark-text uppercase max-md:text-[0.85rem]">Full Name</label>
                  <input type="text" id="name" name="name" autoComplete="name" required className="p-[15px_20px] bg-white/10 border border-gold/40 rounded-[10px] font-cormorant text-[1.1rem] text-section-dark-text transition-all duration-300 focus:outline-none focus:border-gold focus:bg-white/15 placeholder:text-section-dark-text/50 max-md:text-base max-md:p-[12px_15px] max-[430px]:text-[0.95rem] max-[430px]:p-[10px_12px]" />
                </div>
                <div className="flex flex-col gap-2.5">
                  <label htmlFor="email" className="font-playfair text-[0.95rem] font-semibold tracking-[0.1em] text-section-dark-text uppercase max-md:text-[0.85rem]">Email</label>
                  <input type="email" id="email" name="email" autoComplete="email" required className="p-[15px_20px] bg-white/10 border border-gold/40 rounded-[10px] font-cormorant text-[1.1rem] text-section-dark-text transition-all duration-300 focus:outline-none focus:border-gold focus:bg-white/15 placeholder:text-section-dark-text/50 max-md:text-base max-md:p-[12px_15px] max-[430px]:text-[0.95rem] max-[430px]:p-[10px_12px]" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-[25px] max-md:grid-cols-1 max-md:gap-[15px]">
                <div className="flex flex-col gap-2.5">
                  <label htmlFor="phone" className="font-playfair text-[0.95rem] font-semibold tracking-[0.1em] text-section-dark-text uppercase max-md:text-[0.85rem]">Phone Number</label>
                  <input type="tel" id="phone" name="phone" autoComplete="tel" required className="p-[15px_20px] bg-white/10 border border-gold/40 rounded-[10px] font-cormorant text-[1.1rem] text-section-dark-text transition-all duration-300 focus:outline-none focus:border-gold focus:bg-white/15 placeholder:text-section-dark-text/50 max-md:text-base max-md:p-[12px_15px] max-[430px]:text-[0.95rem] max-[430px]:p-[10px_12px]" />
                </div>
                <div className="flex flex-col gap-2.5">
                  <label htmlFor="guests" className="font-playfair text-[0.95rem] font-semibold tracking-[0.1em] text-section-dark-text uppercase max-md:text-[0.85rem]">Number of Guests</label>
                  <input type="number" id="guests" name="guests" min="1" autoComplete="off" required className="p-[15px_20px] bg-white/10 border border-gold/40 rounded-[10px] font-cormorant text-[1.1rem] text-section-dark-text transition-all duration-300 focus:outline-none focus:border-gold focus:bg-white/15 placeholder:text-section-dark-text/50 max-md:text-base max-md:p-[12px_15px] max-[430px]:text-[0.95rem] max-[430px]:p-[10px_12px]" />
                </div>
              </div>
              <div className="flex flex-col gap-2.5">
                <label htmlFor="message" className="font-playfair text-[0.95rem] font-semibold tracking-[0.1em] text-section-dark-text uppercase max-md:text-[0.85rem]">Special Requests</label>
                <textarea id="message" name="message" rows={4} autoComplete="off" className="p-[15px_20px] bg-white/10 border border-gold/40 rounded-[10px] font-cormorant text-[1.1rem] text-section-dark-text transition-all duration-300 focus:outline-none focus:border-gold focus:bg-white/15 placeholder:text-section-dark-text/50 resize-y min-h-[100px] max-md:text-base max-md:p-[12px_15px] max-[430px]:text-[0.95rem] max-[430px]:p-[10px_12px]"></textarea>
              </div>
              <button type="submit" className="px-[50px] py-[18px] bg-gradient-to-br from-gold to-terracotta text-white border-none rounded-full font-playfair text-base font-semibold tracking-[0.2em] uppercase cursor-pointer transition-all duration-400 shadow-[0_4px_20px_rgba(166,123,91,0.3)] self-center mt-5 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(166,123,91,0.5)] hover:bg-gradient-to-br hover:from-terracotta hover:to-gold max-md:px-10 max-md:py-3.5 max-md:text-[0.9rem] max-[430px]:px-[35px] max-[430px]:py-3 max-[430px]:text-[0.85rem]">
                Submit VIP Booking
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Sponsors Carousel Banner - Fixed at Bottom */}
      <div className="fixed bottom-0 left-0 right-0 z-[100] bg-black/60 backdrop-blur-md border-t border-gold/20 overflow-hidden">
        <div className="sponsors-carousel flex items-center py-2.5 gap-[80px]">
          {/* Duplicate the sponsors array for seamless infinite scroll */}
          {[...Array(2)].map((_, setIndex) => (
            <div key={setIndex} className="flex items-center gap-[80px] animate-scroll">
              <span className="font-cormorant text-light-cream/60 text-xs tracking-[0.3em] uppercase whitespace-nowrap">In Partnership With</span>
              <span className="font-playfair text-light-cream/80 text-sm tracking-[0.15em] whitespace-nowrap">SPONSOR 1</span>
              <span className="font-playfair text-light-cream/80 text-sm tracking-[0.15em] whitespace-nowrap">SPONSOR 2</span>
              <span className="font-playfair text-light-cream/80 text-sm tracking-[0.15em] whitespace-nowrap">SPONSOR 3</span>
              <span className="font-playfair text-light-cream/80 text-sm tracking-[0.15em] whitespace-nowrap">SPONSOR 4</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-cream to-dark-terracotta py-20 px-5 pb-[100px] text-center text-light-cream max-md:py-[60px_20px_30px]">
        <div className="font-playfair text-[2.5rem] font-light tracking-[0.3em] mb-5 max-md:text-[2rem] max-[430px]:text-[1.8rem]">MYTHOS</div>
        <div className="text-[1.1rem] tracking-[0.2em] mb-[60px] opacity-80 max-md:text-[0.95rem]">House Meets Heritage</div>

        <div className="flex justify-center gap-10 mb-10 max-md:gap-5">
          <a href="https://www.instagram.com/mythos.syd/" target="_blank" rel="noopener noreferrer" className="text-light-cream no-underline text-base tracking-[0.2em] uppercase transition-colors duration-300 font-light hover:text-gold max-md:text-[0.9rem]">Instagram</a>
          <a href="https://www.tiktok.com/@mythos.syd" target="_blank" rel="noopener noreferrer" className="text-light-cream no-underline text-base tracking-[0.2em] uppercase transition-colors duration-300 font-light hover:text-gold max-md:text-[0.9rem]">TikTok</a>
          <a href="https://www.facebook.com/profile.php?id=61571632207446" target="_blank" rel="noopener noreferrer" className="text-light-cream no-underline text-base tracking-[0.2em] uppercase transition-colors duration-300 font-light hover:text-gold max-md:text-[0.9rem]">Facebook</a>
        </div>
        <div className="inline-block border border-light-cream px-[30px] py-2.5 rounded-full text-[0.9rem] tracking-[0.2em] mt-[30px] max-md:text-[0.8rem] max-md:px-[25px]">
          18+ EVENT
        </div>
      </footer>
    </>
  )
}
