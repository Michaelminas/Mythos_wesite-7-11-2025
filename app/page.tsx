'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import './globals.css'

export default function Home() {
  const [countdown, setCountdown] = useState('')
  const [eventStatus, setEventStatus] = useState<'upcoming' | 'live' | 'ended'>('upcoming')
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formLoading, setFormLoading] = useState(false)

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget

    setFormLoading(true)

    try {
      const response = await fetch('https://formspree.io/f/mnnlajzz', {
        method: 'POST',
        body: new FormData(form),
        headers: {
          'Accept': 'application/json'
        }
      })

      if (response.ok) {
        setFormSubmitted(true)
        form.reset()
        setTimeout(() => setFormSubmitted(false), 5000)
      } else {
        alert('There was an error submitting the form. Please try again.')
      }
    } catch (error) {
      alert('There was an error submitting the form. Please try again.')
    } finally {
      setFormLoading(false)
    }
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

      // For iOS, we need to be even more aggressive
      if (isIOS) {
        mobileVideo.removeAttribute('controls')
        mobileVideo.load()
      }

      // Attempt to autoplay muted video
      const attemptPlay = () => {
        mobileVideo.muted = true
        mobileVideo.volume = 0

        mobileVideo.play()
          .then(() => {
            console.log('Mobile video playing muted')
          })
          .catch(() => {
            console.log('Autoplay blocked, waiting for user interaction')

            // Add interaction listener as fallback
            const playOnInteraction = () => {
              mobileVideo.play().catch(() => console.log('Play failed'))
            }

            document.addEventListener('touchstart', playOnInteraction, { once: true, passive: true })
            document.addEventListener('click', playOnInteraction, { once: true })
          })
      }

      // Multiple rapid-fire attempts
      attemptPlay()
      setTimeout(attemptPlay, 100)
      setTimeout(attemptPlay, 300)
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

      // Check if logo is over bronze VIP section
      const vipSection = document.getElementById('tickets')
      if (heroContent && vipSection) {
        const logoRect = heroContent.getBoundingClientRect()
        const vipRect = vipSection.getBoundingClientRect()

        // Check if logo overlaps with VIP section
        const isOverBronze = logoRect.bottom > vipRect.top && logoRect.top < vipRect.bottom

        if (isOverBronze) {
          heroContent.classList.add('over-bronze')
        } else {
          heroContent.classList.remove('over-bronze')
        }
      }

      // Check if user is near footer
      const footer = document.querySelector('footer')
      const footerTop = footer?.getBoundingClientRect().top || 0
      const windowHeight = window.innerHeight
      const isNearFooter = footerTop < windowHeight

      if (scrollPercent > 0.3 && !isNearFooter) {
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
        href="https://moshtix.com.au/v2/event/mythos-home-the-venue-summer-2025/188117"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed-tickets-btn fixed bottom-[20px] left-1/2 -translate-x-1/2 z-[1000] px-[35px] py-3 bg-bronze text-white no-underline font-helvetica font-semibold tracking-[0.2em] text-[0.85rem] uppercase rounded-full shadow-[0_4px_20px_rgba(150,105,76,0.3)] transition-all duration-600 opacity-0 translate-y-5 pointer-events-none hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(150,105,76,0.5)] hover:bg-bronze/90 max-md:bottom-[20px] max-md:px-[30px] max-md:py-2.5 max-md:text-[0.75rem] max-md:tracking-[0.15em] max-[425px]:px-[25px] max-[425px]:py-2 max-[425px]:text-[0.7rem] max-[375px]:px-[20px] max-[375px]:py-1.5 max-[375px]:text-[0.65rem] max-[375px]:tracking-[0.1em] max-[320px]:px-[18px] max-[320px]:text-[0.6rem]"
      >
        Get Tickets
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
        </div>


        {/* Centered Content Overlay */}
        <div className="hero-content fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[999] text-center w-full max-w-[1200px] px-10 will-change-transform max-md:px-5" id="heroContent">
          <Image
            src="/Mythos Branding/logo final PMS 876C_cmyk copy.png"
            alt="MYTHOS"
            className="hero-logo-img w-auto h-[clamp(80px,15vw,180px)] mb-10 block mx-auto max-md:h-[clamp(60px,12vw,120px)] max-md:mb-[30px] max-[430px]:h-[clamp(50px,10vw,100px)] max-[430px]:mb-5 max-[375px]:h-[clamp(45px,9vw,90px)] max-[375px]:mb-4 max-[320px]:h-[clamp(40px,8vw,80px)] max-[320px]:mb-3"
            width={500}
            height={180}
            style={{ width: 'auto', height: 'auto' }}
            priority
          />


          <div className="hero-date font-helvetica text-[clamp(1.2rem,2.5vw,1.8rem)] font-bold tracking-[0.2em] text-white mb-2.5 uppercase max-md:text-[0.9rem] max-md:mb-2 max-[430px]:text-[0.85rem] max-[430px]:mb-1.5 max-[375px]:text-[0.8rem] max-[375px]:tracking-[0.15em] max-[320px]:text-[0.75rem] max-[320px]:tracking-[0.1em]">
            Friday 19 December
          </div>
          <div className="hero-time font-helvetica text-[clamp(1rem,2vw,1.4rem)] font-normal tracking-[0.15em] text-white/90 uppercase max-md:text-[0.8rem] max-md:tracking-[0.1em] max-[430px]:text-[0.75rem] max-[375px]:text-[0.7rem] max-[375px]:tracking-[0.08em] max-[320px]:text-[0.65rem]">
            9:00pm – 3:00am | HOME THE VENUE, SYDNEY
          </div>


          <a
            href="https://moshtix.com.au/v2/event/mythos-home-the-venue-summer-2025/188117"
            target="_blank"
            rel="noopener noreferrer"
            className={`hero-cta inline-block mt-3 px-[50px] py-[18px] no-underline font-helvetica font-semibold tracking-[0.2em] text-base uppercase rounded-full transition-all duration-400 max-md:px-[30px] max-md:py-3 max-md:text-[0.85rem] max-md:tracking-[0.15em] max-md:mt-[15px] max-[430px]:px-[25px] max-[430px]:py-2.5 max-[430px]:text-[0.8rem] max-[430px]:mt-3 max-[375px]:px-[22px] max-[375px]:py-2 max-[375px]:text-[0.75rem] max-[375px]:tracking-[0.1em] max-[320px]:px-[20px] max-[320px]:py-1.5 max-[320px]:text-[0.7rem] ${
              eventStatus === 'live'
                ? 'bg-bronze text-white shadow-[0_8px_30px_rgba(150,105,76,0.8)] hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(150,105,76,1)] animate-pulse'
                : eventStatus === 'ended'
                ? 'bg-gray-600 text-white/50 cursor-not-allowed shadow-[0_4px_20px_rgba(0,0,0,0.3)]'
                : 'bg-bronze text-white shadow-[0_8px_30px_rgba(150,105,76,0.5)] hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(150,105,76,0.7)]'
            }`}
            {...(eventStatus === 'ended' ? { onClick: (e: React.MouseEvent) => e.preventDefault() } : {})}
          >
            {eventStatus === 'live' ? 'Get Tickets Now!' : eventStatus === 'ended' ? 'Event Ended' : 'Get Tickets'}
          </a>
        </div>
      </section>

      {/* Lineup Section */}
      <section className="reveal py-20 px-5 bg-beige relative z-[2] opacity-0 translate-y-[50px] transition-all duration-800 max-md:py-[50px] max-[430px]:py-10 max-[430px]:px-[15px]">
        {/* Desktop Image - REMOVED */}
        {/* Mobile Image - REMOVED */}
        <div className="max-w-[1200px] mx-auto px-10 relative z-[2]">
          <h2 className="font-helvetica text-[clamp(2.5rem,5vw,4rem)] font-bold tracking-[0.2em] text-center mb-20 text-bronze uppercase max-md:text-[1.8rem] max-md:mb-[30px] max-md:tracking-[0.15em] max-[430px]:text-[1.5rem] max-[430px]:mb-[25px] max-[375px]:text-[1.35rem] max-[375px]:mb-5 max-[320px]:text-[1.2rem] max-[320px]:tracking-[0.1em]">
            Lineup
          </h2>
          <div className="flex justify-between gap-[5%] px-[5%] max-md:flex-col max-md:gap-6 max-md:px-0">
            <div className="flex-1 bg-white/[0.08] backdrop-blur-[10px] p-[40px_25px] border border-bronze/30 transition-all duration-500 relative overflow-hidden hover:-translate-y-2.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:border-bronze before:content-[''] before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-bronze/15 before:to-transparent before:transition-all before:duration-800 hover:before:left-full max-md:p-[40px_30px] max-[375px]:p-[30px_20px] max-[320px]:p-[25px_15px]">
              <div className="font-helvetica text-base font-semibold tracking-[0.3em] text-bronze uppercase mb-4 max-md:text-sm max-md:mb-3 max-[375px]:text-xs max-[375px]:tracking-[0.2em] max-[375px]:mb-3 max-[320px]:text-[0.65rem]">9:00 - 11:45PM</div>
              <h3 className="font-helvetica text-[2.2rem] font-bold tracking-[0.1em] mb-3 text-bronze uppercase max-md:text-[1.3rem] max-md:mb-3 max-[375px]:text-[1.15rem] max-[375px]:mb-3 max-[320px]:text-[1.05rem] max-[320px]:mb-2">CONTROLLA</h3>
              <p className="font-helvetica text-[1.1rem] leading-[1.7] text-bronze/85 font-normal max-md:text-[0.9rem] max-md:leading-[1.6] max-[375px]:text-[0.85rem] max-[375px]:leading-[1.5] max-[320px]:text-[0.8rem] max-[320px]:leading-[1.4]">Controlla, fresh off his Ios tour in Greece, will open the night with a high-energy set of European anthems to set the tone.</p>
            </div>
            <div className="flex-1 bg-white/[0.08] backdrop-blur-[10px] p-[40px_25px] border border-bronze/30 transition-all duration-500 relative overflow-hidden hover:-translate-y-2.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:border-bronze before:content-[''] before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-bronze/15 before:to-transparent before:transition-all before:duration-800 hover:before:left-full max-md:p-[40px_30px] max-[375px]:p-[30px_20px] max-[320px]:p-[25px_15px]">
              <div className="font-helvetica text-base font-semibold tracking-[0.3em] text-bronze uppercase mb-4 max-md:text-sm max-md:mb-3 max-[375px]:text-xs max-[375px]:tracking-[0.2em] max-[375px]:mb-3 max-[320px]:text-[0.65rem]">11:45PM - 3:00AM</div>
              <h3 className="font-helvetica text-[2.2rem] font-bold tracking-[0.1em] mb-3 text-bronze uppercase max-md:text-[1.3rem] max-md:mb-3 max-[375px]:text-[1.15rem] max-[375px]:mb-3 max-[320px]:text-[1.05rem] max-[320px]:mb-2">KINEZOS</h3>
              <p className="font-helvetica text-[1.1rem] leading-[1.7] text-bronze/85 font-normal max-md:text-[0.9rem] max-md:leading-[1.6] max-[375px]:text-[0.85rem] max-[375px]:leading-[1.5] max-[320px]:text-[0.8rem] max-[320px]:leading-[1.4]">Kinezos will take control of the night with an explosive set fusing 2025's biggest summer hits with Greek music, house, RNB, and timeless throwbacks.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Plus Live Entertainment Divider */}
      <section className="relative w-full py-12 bg-gradient-to-r from-transparent via-bronze to-transparent max-md:py-8 max-md:bg-gradient-to-r max-md:from-beige max-md:via-bronze max-md:to-beige">
        <div className="text-center px-5 max-md:relative max-md:z-10">
          <h3 className="font-helvetica text-[clamp(1.5rem,2.5vw,2rem)] font-bold mb-[15px] text-beige uppercase max-[430px]:text-[1.2rem] max-md:mb-3">Plus Live Entertainment</h3>
          <p className="font-helvetica text-[1.1rem] text-beige/90 font-normal max-w-[800px] mx-auto max-md:text-[0.95rem] max-md:leading-[1.6]">Featuring pyrotechnics, dancers, live acts, and surprise performances throughout the night</p>
        </div>
        {/* Decorative lines for mobile */}
        <div className="hidden max-md:block absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-beige via-bronze to-beige opacity-40"></div>
        <div className="hidden max-md:block absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-beige via-bronze to-beige opacity-40"></div>
      </section>

      {/* Event Details Section */}
      <section className="reveal py-20 px-5 bg-beige relative z-[2] opacity-0 translate-y-[50px] transition-all duration-800 max-md:py-[50px] max-[430px]:py-10 max-[430px]:px-[15px]">
        {/* Desktop Image - REMOVED */}
        {/* Mobile Image - REMOVED */}
        <div className="max-w-[1200px] mx-auto px-10 relative z-[2]">
          <h2 className="font-helvetica text-[clamp(2.5rem,5vw,4rem)] font-bold text-center mb-16 text-bronze uppercase max-md:text-[1.8rem] max-md:mb-10 max-[430px]:text-[1.5rem] max-[430px]:mb-8">
            Event Details
          </h2>

          {/* Desktop: Two columns - Instagram left, Text right */}
          <div className="flex gap-12 items-start max-md:flex-col max-md:gap-8">
            {/* Instagram Embed - Left side on desktop, top on mobile */}
            <div className="flex-shrink-0 w-[540px] max-w-full max-md:w-full max-md:mx-auto" dangerouslySetInnerHTML={{__html: `
              <blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="https://www.instagram.com/p/DQtOAthks1K/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"><div style="padding:16px;"> <a href="https://www.instagram.com/p/DQtOAthks1K/?utm_source=ig_embed&amp;utm_campaign=loading" style=" background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%;" target="_blank"> <div style=" display: flex; flex-direction: row; align-items: center;"> <div style="background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 40px; margin-right: 14px; width: 40px;"></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 100px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 60px;"></div></div></div><div style="padding: 19% 0;"></div> <div style="display:block; height:50px; margin:0 auto 12px; width:50px;"><svg width="50px" height="50px" viewBox="0 0 60 60" version="1.1" xmlns="https://www.w3.org/2000/svg" xmlns:xlink="https://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-511.000000, -20.000000)" fill="#000000"><g><path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631"></path></g></g></g></svg></div><div style="padding-top: 8px;"> <div style=" color:#3897f0; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:550; line-height:18px;">View this post on Instagram</div></div><div style="padding: 12.5% 0;"></div> <div style="display: flex; flex-direction: row; margin-bottom: 14px; align-items: center;"><div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(0px) translateY(7px);"></div> <div style="background-color: #F4F4F4; height: 12.5px; transform: rotate(-45deg) translateX(3px) translateY(1px); width: 12.5px; flex-grow: 0; margin-right: 14px; margin-left: 2px;"></div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(9px) translateY(-18px);"></div></div><div style="margin-left: 8px;"> <div style=" background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 20px; width: 20px;"></div> <div style=" width: 0; height: 0; border-top: 2px solid transparent; border-left: 6px solid #f4f4f4; border-bottom: 2px solid transparent; transform: translateX(16px) translateY(-4px) rotate(30deg)"></div></div><div style="margin-left: auto;"> <div style=" width: 0px; border-top: 8px solid #F4F4F4; border-right: 8px solid transparent; transform: translateY(16px);"></div> <div style=" background-color: #F4F4F4; flex-grow: 0; height: 12px; width: 16px; transform: translateY(-4px);"></div> <div style=" width: 0; height: 0; border-top: 8px solid #F4F4F4; border-left: 8px solid transparent; transform: translateY(-4px) translateX(8px);"></div></div></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center; margin-bottom: 24px;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 224px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 144px;"></div></div></a><p style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;"><a href="https://www.instagram.com/p/DQtOAthks1K/?utm_source=ig_embed&amp;utm_campaign=loading" style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none;" target="_blank">A post shared by Mythos Entertainment (@mythos.syd)</a></p></div></blockquote>
              <script async src="//www.instagram.com/embed.js"></script>
            `}} />

            {/* Description Text - Right side on desktop, bottom on mobile */}
            <div className="flex-1 flex flex-col justify-center text-left max-md:text-center">
              <p className="font-helvetica text-[clamp(1.1rem,2vw,1.4rem)] leading-[2] mb-6 font-normal text-bronze max-md:text-base max-md:leading-[1.8] max-md:mb-5 max-[430px]:text-[0.95rem] max-[430px]:leading-[1.7]">
                After a SOLD-OUT event, Mythos is taking over Home the Venue this summer for the next chapter of&nbsp;Sydney&apos;s modern European&nbsp;nightlife.
              </p>
              <p className="font-helvetica text-[clamp(1.1rem,2vw,1.4rem)] leading-[2] mb-6 font-normal text-bronze max-md:text-base max-md:leading-[1.8] max-md:mb-5 max-[430px]:text-[0.95rem] max-[430px]:leading-[1.7]">
                Experience live Greek music, European anthems, and high-energy performances from dancers and live acts. Every set blends the best of Europe and Greece, creating a night built for rhythm, energy, and&nbsp;connection.
              </p>
              <p className="font-helvetica text-[clamp(1.1rem,2vw,1.4rem)] leading-[2] font-normal text-bronze max-md:text-base max-md:leading-[1.8] max-[430px]:text-[0.95rem] max-[430px]:leading-[1.7]">
                Join us for a full sensory takeover with world-class sound, lighting, and production that defines the Mythos&nbsp;experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* VIP Bookings Section */}
      <section className="reveal py-20 px-5 bg-bronze relative z-[2] opacity-0 translate-y-[50px] transition-all duration-800 max-md:py-[50px] max-md:px-[15px] max-[430px]:py-10 max-[430px]:px-[10px]" id="tickets">
        {/* Desktop Images */}
        <div className="atmosphere-img absolute w-[48vw] max-w-[720px] h-[54vw] max-h-[820px] opacity-0 transition-all duration-1000 pointer-events-none overflow-hidden z-[1] right-[-8%] top-[18%] rotate-[6deg] scale-95 max-[600px]:hidden">
          <Image src="/Event Photos/Webp/vip 1.webp" alt="" fill style={{ objectFit: 'cover' }} loading="lazy" sizes="(max-width: 600px) 0vw, 48vw" quality={85} />
        </div>
        <div className="atmosphere-img absolute w-[45vw] max-w-[680px] h-[51vw] max-h-[780px] opacity-0 transition-all duration-1000 pointer-events-none overflow-hidden z-[1] left-[-6%] bottom-[8%] -rotate-[7deg] scale-95 max-[600px]:hidden">
          <Image src="/Event Photos/Webp/vip 2.webp" alt="" fill style={{ objectFit: 'cover' }} loading="lazy" sizes="(max-width: 600px) 0vw, 45vw" quality={85} />
        </div>
        {/* Mobile Image - REMOVED */}
        <div className="max-w-[1200px] mx-auto px-10 relative z-[2] max-md:px-0">
          <h2 className="font-helvetica text-[clamp(2.5rem,5vw,4rem)] font-bold tracking-[0.2em] text-center mb-20 text-beige capitalize max-md:text-[1.8rem] max-md:mb-[30px] max-md:tracking-[0.15em] max-[430px]:text-[1.5rem] max-[430px]:mb-5 max-[375px]:text-[1.3rem] max-[320px]:text-[1.2rem]">
            VIP Table Bookings
          </h2>
          <div className="max-w-[800px] mx-auto bg-white/[0.08] backdrop-blur-[20px] p-[60px_50px] border border-beige/30 max-md:p-[30px_20px] max-[430px]:p-[25px_15px] max-[375px]:p-[20px_12px] max-[320px]:p-[18px_10px]">
            {formSubmitted && (
              <div className="mb-6 p-4 bg-beige/20 border border-beige text-center">
                <p className="text-beige font-helvetica tracking-wide">Thank you! Your booking request has been sent.</p>
              </div>
            )}
            <form className="flex flex-col gap-[25px] max-md:gap-5 max-[430px]:gap-4" onSubmit={handleFormSubmit}>
              <div className="grid grid-cols-2 gap-[25px] max-md:grid-cols-1 max-md:gap-4">
                <div className="flex flex-col gap-2 max-[430px]:gap-1.5">
                  <label htmlFor="name" className="font-helvetica text-[0.95rem] font-normal tracking-[0.1em] text-beige uppercase max-md:text-[0.8rem] max-[375px]:text-[0.75rem] max-[320px]:text-[0.7rem]">Full Name</label>
                  <input type="text" id="name" name="name" autoComplete="name" required className="p-[15px_20px] bg-white/10 border border-beige/40 font-helvetica text-[1.1rem] text-beige transition-all duration-300 focus:outline-none focus:border-beige focus:bg-white/15 placeholder:text-beige/50 max-md:text-[0.95rem] max-md:p-[10px_12px] max-[375px]:text-[0.9rem] max-[375px]:p-[8px_10px] max-[320px]:text-[0.85rem]" />
                </div>
                <div className="flex flex-col gap-2 max-[430px]:gap-1.5">
                  <label htmlFor="email" className="font-helvetica text-[0.95rem] font-normal tracking-[0.1em] text-beige uppercase max-md:text-[0.8rem] max-[375px]:text-[0.75rem] max-[320px]:text-[0.7rem]">Email</label>
                  <input type="email" id="email" name="email" autoComplete="email" required className="p-[15px_20px] bg-white/10 border border-beige/40 font-helvetica text-[1.1rem] text-beige transition-all duration-300 focus:outline-none focus:border-beige focus:bg-white/15 placeholder:text-beige/50 max-md:text-[0.95rem] max-md:p-[10px_12px] max-[375px]:text-[0.9rem] max-[375px]:p-[8px_10px] max-[320px]:text-[0.85rem]" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-[25px] max-md:grid-cols-1 max-md:gap-4">
                <div className="flex flex-col gap-2 max-[430px]:gap-1.5">
                  <label htmlFor="phone" className="font-helvetica text-[0.95rem] font-normal tracking-[0.1em] text-beige uppercase max-md:text-[0.8rem] max-[375px]:text-[0.75rem] max-[320px]:text-[0.7rem]">Phone Number</label>
                  <input type="tel" id="phone" name="phone" autoComplete="tel" required className="p-[15px_20px] bg-white/10 border border-beige/40 font-helvetica text-[1.1rem] text-beige transition-all duration-300 focus:outline-none focus:border-beige focus:bg-white/15 placeholder:text-beige/50 max-md:text-[0.95rem] max-md:p-[10px_12px] max-[375px]:text-[0.9rem] max-[375px]:p-[8px_10px] max-[320px]:text-[0.85rem]" />
                </div>
                <div className="flex flex-col gap-2 max-[430px]:gap-1.5">
                  <label htmlFor="guests" className="font-helvetica text-[0.95rem] font-normal tracking-[0.1em] text-beige uppercase max-md:text-[0.8rem] max-[375px]:text-[0.75rem] max-[320px]:text-[0.7rem]">Number of Guests</label>
                  <input type="number" id="guests" name="guests" min="1" autoComplete="off" required className="p-[15px_20px] bg-white/10 border border-beige/40 font-helvetica text-[1.1rem] text-beige transition-all duration-300 focus:outline-none focus:border-beige focus:bg-white/15 placeholder:text-beige/50 max-md:text-[0.95rem] max-md:p-[10px_12px] max-[375px]:text-[0.9rem] max-[375px]:p-[8px_10px] max-[320px]:text-[0.85rem]" />
                </div>
              </div>
              <div className="flex flex-col gap-2 max-[430px]:gap-1.5">
                <label htmlFor="message" className="font-helvetica text-[0.95rem] font-normal text-beige uppercase max-md:text-[0.8rem] max-[375px]:text-[0.75rem] max-[320px]:text-[0.7rem]">Special Requests & Details</label>
                <textarea id="message" name="message" rows={4} autoComplete="off" className="p-[15px_20px] bg-white/10 border border-beige/40 font-helvetica text-[1.1rem] text-beige transition-all duration-300 focus:outline-none focus:border-beige focus:bg-white/15 placeholder:text-beige/50 resize-y min-h-[100px] max-md:text-[0.95rem] max-md:p-[10px_12px] max-md:min-h-[80px] max-[375px]:text-[0.9rem] max-[375px]:p-[8px_10px] max-[375px]:min-h-[70px] max-[320px]:text-[0.85rem]"></textarea>
              </div>
              <button type="submit" disabled={formLoading} className="px-[50px] py-[18px] bg-beige text-bronze border-none rounded-full font-helvetica text-base font-semibold tracking-[0.2em] uppercase cursor-pointer transition-all duration-400 shadow-[0_4px_20px_rgba(223,213,200,0.3)] self-center mt-5 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(223,213,200,0.5)] hover:bg-beige/90 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-[0_4px_20px_rgba(223,213,200,0.3)] max-md:px-10 max-md:py-3 max-md:text-[0.85rem] max-md:mt-3 max-[430px]:px-8 max-[430px]:py-2.5 max-[430px]:text-[0.8rem] max-[375px]:px-7 max-[375px]:py-2 max-[375px]:text-[0.75rem] max-[375px]:tracking-[0.15em] max-[320px]:px-6 max-[320px]:text-[0.7rem]">
                {formLoading ? 'Submitting...' : 'Submit VIP Booking'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Sponsors Section */}
      <section className="py-8 px-5 bg-beige text-center relative z-[2]">
        <div className="max-w-[1200px] mx-auto">
          <h3 className="font-helvetica text-[1.5rem] font-bold mb-6 text-bronze uppercase">In Partnership With</h3>
          <div className="flex items-center justify-center gap-12 max-md:gap-8 max-[425px]:gap-6">
            <Image src="/Sponsors/bayvista logo.png" alt="Bayvista" width={120} height={60} className="h-[60px] w-auto object-contain max-md:h-[50px] max-[425px]:h-[40px]" />
            <Image src="/Sponsors/Nieos Grille Logo.png" alt="Nieos Grille" width={120} height={60} className="h-[60px] w-auto object-contain max-md:h-[50px] max-[425px]:h-[40px]" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-bronze py-6 px-5 text-center">
        <div className="flex justify-center gap-8 max-md:gap-6">
          {/* Instagram */}
          <a href="https://www.instagram.com/mythos.syd/" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Instagram" className="transition-all duration-300 hover:opacity-70 hover:scale-110 p-2 -m-2">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
          {/* TikTok */}
          <a href="https://www.tiktok.com/@mythos.syd" target="_blank" rel="noopener noreferrer" aria-label="Follow us on TikTok" className="transition-all duration-300 hover:opacity-70 hover:scale-110 p-2 -m-2">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
            </svg>
          </a>
          {/* Facebook */}
          <a href="https://www.facebook.com/profile.php?id=61571632207446" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Facebook" className="transition-all duration-300 hover:opacity-70 hover:scale-110 p-2 -m-2">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
        </div>
      </footer>
    </>
  )
}
