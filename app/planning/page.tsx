"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

const services = [
  {
    number: "01",
    title: "Full Event Planning",
    description:
      "From the first idea to the final moment, we bring every element together. Venue sourcing, suppliers, styling, timelines and on-the-day coordination — thoughtfully handled from beginning to end.",
  },
  {
    number: "02",
    title: "Partial Event Planning",
    description:
      "Already started planning? We'll build on what you've organised, take care of the remaining details and make sure everything comes together seamlessly.",
  },
  {
    number: "03",
    title: "Event-Day Coordination",
    description:
      "Enjoy the celebration you've worked so hard to create. We'll manage schedules, suppliers and the little details so you can be fully present.",
  },
];

const eventTypes = [
  "Birthday / Milestone",
  "Christening",
  "Engagement",
  "Wedding",
  "Corporate Event",
  "Other",
];

const bookedOptions = [
  "Venue",
  "Catering",
  "Entertainment",
  "Styling",
  "Other",
  "Nothing yet",
];

const supportOptions = [
  "Venue sourcing",
  "Catering",
  "Entertainment",
  "Styling",
  "Supplier coordination",
  "Logistics",
  "Event-day management",
  "Everything",
];

export default function PlanningPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero || !("IntersectionObserver" in window)) {
      setHeaderVisible(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      setHeaderVisible(entry.intersectionRatio < 0.45);
    }, { threshold: [0, 0.45, 1] });
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const root = pageRef.current;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!root || preference.matches || !("IntersectionObserver" in window)) return;
    const targets = root.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove("reveal-pending");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    targets.forEach((target) => {
      if (target.getBoundingClientRect().top >= window.innerHeight) {
        target.classList.add("reveal-pending");
        observer.observe(target);
      }
    });
    const showAll = () => {
      if (preference.matches) {
        targets.forEach((target) => target.classList.remove("reveal-pending"));
        observer.disconnect();
      }
    };
    preference.addEventListener("change", showAll);
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", showAll);
      targets.forEach((target) => target.classList.remove("reveal-pending"));
    };
  }, []);

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [booked, setBooked] = useState<string[]>([]);
  const [support, setSupport] = useState<string[]>([]);

  function toggle(
    value: string,
    selected: string[],
    update: (values: string[]) => void
  ) {
    update(
      selected.includes(value)
        ? selected.filter((item) => item !== value)
        : [...selected, value]
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    const data = new FormData(event.currentTarget);
    data.set("alreadyBooked", booked.join(", ") || "Not specified");
    data.set("supportNeeded", support.join(", ") || "Not specified");
    data.set("_subject", "New MYTHOS Planning enquiry");
    setSubmitting(true);
    setSubmitError("");
    try {
      const response = await fetch("https://formspree.io/f/meaenjjy", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error("Submission failed");
      setSubmitted(true);
    } catch {
      setSubmitError("We couldn't confirm your enquiry was sent. Please try again or email planning@mythosentertainment.com.au.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#F5F1EA] text-[#49362D]">
      <style jsx global>{`
        @media (prefers-reduced-motion: no-preference) {
          html:has(.planning-page) { scroll-behavior: smooth; }
        }

        .planning-page section[id] { scroll-margin-top: 96px; }

        @media (prefers-reduced-motion: no-preference) {
          .planning-page [data-reveal] {
            transition: opacity 1200ms cubic-bezier(0.22, 1, 0.36, 1), transform 1400ms cubic-bezier(0.22, 1, 0.36, 1);
          }
          .planning-page .reveal-pending { opacity: 0; transform: translateY(12px); }
          .planning-page .reveal-pending:focus-within { opacity: 1; transform: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          html:has(.planning-page) { scroll-behavior: auto !important; }
          .planning-page *, .planning-page *::before, .planning-page *::after {
            animation: none !important;
            transition: none !important;
          }
        }

        .planning-page a:focus-visible,
        .planning-page button:focus-visible {
          outline: 2px solid #754b35;
          outline-offset: 4px;
        }

        @keyframes planning-entrance {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @media (prefers-reduced-motion: no-preference) {
          .planning-page .brand-hero {
            animation: planning-entrance 1800ms cubic-bezier(0.22, 1, 0.36, 1) both;
          }
        }

        .planning-page .brand-hero {
          background: radial-gradient(ellipse at 65% 30%, #fffaf1 0%, #f5ebdc 48%, #eaddca 100%);
        }
        .planning-page .brand-hero::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: -1;
          opacity: 0.14;
          pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Cpath fill='%23836a50' filter='url(%23n)' opacity='.55' d='M0 0h180v180H0z'/%3E%3C/svg%3E");
        }

        .planning-page section:not(.brand-hero), .planning-page footer {
          position: relative;
          isolation: isolate;
          overflow: clip;
        }
        .planning-page section:not(.brand-hero) > div, .planning-page footer > div {
          position: relative;
          z-index: 1;
        }
        .planning-page section:not(.brand-hero)::after, .planning-page footer::after {
          content: "";
          position: absolute;
          pointer-events: none;
          z-index: 0;
          top: 24px;
          right: -45px;
          width: clamp(170px, 20vw, 280px);
          height: 420px;
          background: url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20240%20420%22%20fill%3D%22none%22%3E%3Cg%20stroke%3D%22%23756449%22%20stroke-width%3D%221.6%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22M30%20430C65%20330%2075%20255%20116%20184S166%2070%20183%207M87%20250C59%20223%2032%20190%2017%20150M124%20169C157%20159%20188%20143%20220%20115M66%20330C103%20316%20140%20287%20167%20255%22%2F%3E%3Cpath%20d%3D%22M178%2036Q150%2016%20169%200Q190%2013%20178%2036ZM168%2065Q194%2033%20210%2040Q207%2065%20168%2065ZM153%20103Q125%2078%20142%2061Q166%2079%20153%20103ZM142%20127Q173%2095%20189%20105Q180%20131%20142%20127ZM121%20174Q96%20147%20110%20129Q133%20147%20121%20174ZM106%20204Q137%20182%20153%20194Q143%20216%20106%20204ZM91%20244Q68%20214%2080%20200Q105%20218%2091%20244ZM77%20284Q106%20258%20121%20272Q110%20296%2077%20284ZM63%20329Q39%20303%2049%20285Q72%20301%2063%20329ZM49%20374Q80%20344%2097%20355Q89%20381%2049%20374ZM53%20200Q26%20204%2017%20183Q38%20175%2053%20200ZM34%20174Q41%20148%2026%20136Q10%20150%2034%20174ZM172%20147Q174%20122%20192%20119Q204%20137%20172%20147ZM204%20127Q205%2099%20225%2091Q240%20110%20204%20127ZM125%20291Q127%20265%20145%20262Q155%20282%20125%20291ZM153%20270Q152%20244%20171%20232Q185%20251%20153%20270Z%22%2F%3E%3Cellipse%20cx%3D%22101%22%20cy%3D%22232%22%20rx%3D%225%22%20ry%3D%228%22%20fill%3D%22%23756449%22%20stroke%3D%22none%22%2F%3E%3Cellipse%20cx%3D%22152%22%20cy%3D%22151%22%20rx%3D%225%22%20ry%3D%228%22%20fill%3D%22%23756449%22%20stroke%3D%22none%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E") center / contain no-repeat;
          opacity: 0.16;
          transform: rotate(-12deg);
        }
        .planning-page #about::after, .planning-page #enquiry::after {
          left: -55px;
          right: auto;
          transform: scaleX(-1) rotate(-12deg);
          opacity: 0.12;
        }
        .planning-page footer::after {
          top: auto;
          bottom: -100px;
          opacity: 0.12;
          filter: brightness(0) invert(1);
        }
        .planning-page h2::after {
          content: "";
          display: block;
          width: 76px;
          height: 26px;
          margin-top: 22px;
          background: url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20100%2032%22%20fill%3D%22none%22%20stroke%3D%22%238c7655%22%20stroke-width%3D%221.2%22%20stroke-linecap%3D%22round%22%3E%3Cpath%20d%3D%22M4%2028Q45%2022%2094%204M27%2023Q18%208%2032%207Q43%2016%2027%2023ZM45%2018Q40%203%2053%202Q63%2011%2045%2018ZM63%2012Q74%2028%2083%2017Q80%207%2063%2012Z%22%2F%3E%3C%2Fsvg%3E") center / contain no-repeat;
          opacity: 0.8;
        }
        .planning-page #enquiry h2::after { margin-left: auto; margin-right: auto; }
        @media (max-width: 600px) {
          .planning-page section:not(.brand-hero)::after { width: 160px; height: 300px; opacity: 0.09; right: -65px; }
          .planning-page #about::after, .planning-page #enquiry::after { left: -75px; right: auto; }
        }

        .planning-page .olive-shadow { color: #756449; opacity: 0.22; filter: blur(6px); transform: rotate(-9deg); }
        @media (max-width: 600px) {
          .planning-page .olive-shadow { opacity: 0.13; left: -150px; }
        }

        .planning-page {
          font-family: Arial, Helvetica, sans-serif;
        }

        .planning-page .editorial {
          font-family: Georgia, "Times New Roman", serif;
          font-weight: 400;
        }

        .planning-page input,
        .planning-page select,
        .planning-page textarea {
          width: 100%;
          border: 1px solid #d7c7b9;
          background: rgba(255, 255, 255, 0.72);
          padding: 14px 15px;
          border-radius: 2px;
          color: #49362d;
          outline-color: #96694c;
        }

        .planning-page label {
          display: block;
          font-size: 12px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 9px;
        }

        .planning-page .choice {
          border: 1px solid #d7c7b9;
          padding: 11px 14px;
          font-size: 13px;
          transition: all 0.2s ease;
        }

        .planning-page .choice.active {
          background: #96694c;
          border-color: #96694c;
          color: white;
        }
      `}</style>

      <div ref={pageRef} className="planning-page">
        {/* SCROLL HEADER */}
        <header
          aria-hidden={!headerVisible}
          className={`fixed top-0 left-0 right-0 z-50 border-b border-[#D9CDC0]/60 bg-[#F5F1EA]/95 backdrop-blur-md transition-[opacity,transform] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${headerVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"}`}
        >
          <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-5 md:px-12">
            <a href="#top" tabIndex={headerVisible ? undefined : -1} aria-label="MYTHOS Planning — back to top" className="flex shrink-0 flex-col items-center gap-1.5">
              <img src="/mythos-branding/logo-final.png" alt="MYTHOS" width="160" height="23" className="h-auto w-28 sm:w-32" />
              <span className="text-[8px] uppercase tracking-[0.45em] text-[#834B2C]">Planning</span>
            </a>
            <nav aria-label="Planning sections" className="hidden items-center gap-6 text-[10px] uppercase tracking-[0.16em] text-[#49362D] lg:flex">
              <a href="#services" tabIndex={headerVisible ? undefined : -1}>Services</a>
              <a href="#about" tabIndex={headerVisible ? undefined : -1}>About</a>
              <a href="#work" tabIndex={headerVisible ? undefined : -1}>Our Work</a>
              <a href="#enquiry" tabIndex={headerVisible ? undefined : -1}>Contact</a>
            </nav>
            <a href="#enquiry" tabIndex={headerVisible ? undefined : -1} className="shrink-0 whitespace-nowrap bg-[#834B2C] px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-[#65371F]">Plan Your Event</a>
          </div>
        </header>

        {/* HERO */}
        <section ref={heroRef} id="top" aria-label="MYTHOS Planning" className="brand-hero relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden px-6 py-24 text-center">
          <svg aria-hidden="true" className="olive-shadow pointer-events-none absolute -left-24 top-0 h-full w-[45%] min-w-[260px]" viewBox="0 0 300 750" fill="none" preserveAspectRatio="xMidYMid slice">
            <path d="M-40 780 Q130 500 35 260 Q0 140 65 -30 M30 290 Q155 240 200 80 M65 490 Q185 475 245 330" stroke="currentColor" strokeWidth="5" />
            {[{x:49,y:45,r:-30},{x:38,y:115,r:40},{x:16,y:180,r:-35},{x:51,y:250,r:48},{x:87,y:287,r:-40},{x:127,y:220,r:40},{x:170,y:150,r:-35},{x:190,y:88,r:30},{x:66,y:360,r:-40},{x:83,y:425,r:50},{x:127,y:474,r:-35},{x:179,y:433,r:35},{x:220,y:370,r:-35},{x:62,y:535,r:45},{x:24,y:600,r:-35},{x:0,y:680,r:45}].map((leaf,i)=>(<ellipse key={i} cx={leaf.x} cy={leaf.y} rx="12" ry="39" fill="currentColor" transform={`rotate(${leaf.r} ${leaf.x} ${leaf.y})`} />))}
          </svg>
          <div className="relative mx-auto w-full max-w-4xl">
            <h1 className="flex flex-col items-center">
              <img src="/mythos-branding/logo-final.png" alt="MYTHOS" width="900" height="130" fetchPriority="high" className="h-auto w-full max-w-[720px]" />
              <span className="editorial mt-6 block pl-[0.32em] text-[clamp(1.1rem,3vw,2.4rem)] uppercase tracking-[0.32em] text-[#834B2C] md:mt-8">Planning</span>
            </h1>
            <div aria-hidden="true" className="mx-auto my-7 h-px w-20 bg-[#96694C]/80 md:my-9" />
            <p className="text-[10px] uppercase leading-6 tracking-[0.28em] text-[#49362D] sm:text-xs md:tracking-[0.38em]">Event Planning &amp; Experiences</p>
            <a href="#enquiry" className="mt-8 inline-flex min-h-12 items-center justify-center bg-[#834B2C] px-8 py-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[#65371F]">Plan Your Event</a>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="px-6 py-24 md:px-12 md:py-32">
          <div data-reveal className="mx-auto max-w-7xl">
            <p className="mb-5 text-xs uppercase tracking-[0.3em] text-[#96694C]">
              What We Do
            </p>
            <h2 className="editorial mb-16 text-5xl md:text-6xl">
              Our Services
            </h2>

            <div className="grid gap-12 md:grid-cols-3">
              {services.map((service) => (
                <article
                  key={service.number}
                  className="border-t border-[#BCA58F] pt-7"
                >
                  <p className="mb-10 text-xs tracking-[0.2em] text-[#96694C]">
                    {service.number}
                  </p>
                  <h3 className="editorial mb-6 text-3xl">
                    {service.title}
                  </h3>
                  <p className="text-sm leading-8 text-[#756257]">
                    {service.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="bg-[#E9DFD3] px-6 py-24 md:px-12 md:py-32">
          <div data-reveal className="mx-auto grid max-w-7xl items-center gap-14 md:grid-cols-2">
            <div className="flex aspect-[4/5] items-center justify-center border border-[#BCA58F] bg-[#D9C8B6] p-10 text-center">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-[#96694C]">
                  The People Behind The Moments
                </p>
                <img src="/mythos-branding/logo-final.png" alt="MYTHOS" width="320" height="46" loading="lazy" className="mx-auto mt-8 h-auto w-full max-w-xs" />
                <p className="mt-3 text-xs uppercase tracking-[0.3em]">
                  Planning
                </p>
              </div>
            </div>

            <div>
              <p className="mb-5 text-xs uppercase tracking-[0.3em] text-[#96694C]">
                Our Story
              </p>
              <h2 className="editorial mb-8 text-5xl md:text-6xl">
                About Mythos Planning
              </h2>
              <p className="mb-6 text-sm leading-8 text-[#6B5549]">
                Born from our experience creating memorable MYTHOS
                Entertainment events, MYTHOS PLANNING brings the same
                attention to atmosphere, organisation and guest experience
                to personal celebrations.
              </p>
              <p className="text-sm leading-8 text-[#6B5549]">
                Whether you're celebrating a milestone birthday, a
                christening, an engagement or something entirely your own,
                we believe the best events feel personal, considered and
                genuinely effortless for the people hosting them.
              </p>
            </div>
          </div>
        </section>

        {/* OUR WORK */}
        <section id="work" className="px-6 py-24 md:px-12 md:py-32">
          <div data-reveal className="mx-auto max-w-7xl">
            <p className="mb-5 text-xs uppercase tracking-[0.3em] text-[#96694C]">
              Moments We've Created
            </p>
            <h2 className="editorial mb-6 text-5xl md:text-6xl">
              Our Work
            </h2>
            <p className="mb-14 max-w-xl text-sm leading-8 text-[#756257]">
              A glimpse into the experiences we've brought to life
              through MYTHOS Entertainment.
            </p>

            <div className="grid gap-5 md:grid-cols-3">
              {[
                "MYTHOS Events",
                "Celebrations & Atmosphere",
                "Unforgettable Moments",
              ].map((title, index) => (
                <div key={title}>
                  <div className="flex aspect-[4/5] items-center justify-center bg-[#E3D5C7] px-8 text-center">
                    <span className="editorial text-3xl italic text-[#96694C]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="mt-5 text-xs uppercase tracking-[0.18em]">
                    {title}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-7 text-xs italic text-[#887469]">
              Gallery placeholders — we'll replace these with your actual
              event photographs.
            </p>
          </div>
        </section>

        {/* ENQUIRY FORM */}
        <section
          id="enquiry"
          className="scroll-mt-24 bg-[#E9DFD3] px-6 py-24 md:px-12 md:py-32"
        >
          <div className="mx-auto max-w-4xl">
            <div className="mb-14 text-center">
              <p className="mb-5 text-xs uppercase tracking-[0.3em] text-[#96694C]">
                Let's Create Something Memorable
              </p>
              <h2 className="editorial text-5xl md:text-6xl">
                Plan Your Event
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-sm leading-8 text-[#756257]">
                Tell us a little about your celebration. We'll be in
                touch to discuss your vision and how we can help.
              </p>
            </div>

            {submitted ? (
              <div role="status" aria-live="polite" className="border border-[#C7B4A3] bg-white/50 px-8 py-14 text-center">
                <h3 className="editorial text-3xl">
                  Thank you for your enquiry
                </h3>
                <p className="mt-4 text-sm leading-7">
                  Your enquiry has been received. We'll be in touch to
                  discuss your celebration and how we can help.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-8 text-xs uppercase tracking-[0.2em] text-[#96694C] underline"
                >
                  Send Another Enquiry
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                action="https://formspree.io/f/meaenjjy"
                method="POST"
                aria-busy={submitting}
                className="border border-[#D0BEAD] bg-white/35 p-6 shadow-sm md:p-12"
              >
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="website">Leave this field empty</label>
                  <input id="website" name="_gotcha" tabIndex={-1} autoComplete="off" />
                </div>
                <fieldset disabled={submitting}>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label htmlFor="fullName">Full Name *</label>
                    <input id="fullName" name="fullName" autoComplete="name" required />
                  </div>
                  <div>
                    <label htmlFor="email">Email *</label>
                    <input
                      id="email"
                      name="email"
                      autoComplete="email"
                      type="email"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="phone">Phone (optional)</label>
                    <input
                      id="phone"
                      name="phone"
                      autoComplete="tel"
                      type="tel"
                    />
                  </div>
                  <div>
                    <label htmlFor="eventType">Event Type *</label>
                    <select id="eventType" name="eventType" required defaultValue="">
                      <option value="" disabled>
                        Select an event
                      </option>
                      {eventTypes.map((type) => (
                        <option key={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="eventDate">Event Date</label>
                    <input
                      id="eventDate"
                      name="eventDate"
                      type="date"
                    />
                    <p className="mt-2 text-xs text-[#887469]">
                      Leave blank if undecided or flexible.
                    </p>
                  </div>
                  <div>
                    <label htmlFor="guests">Estimated Guests</label>
                    <input
                      id="guests"
                      name="guests"
                      type="number"
                      min="1"
                      placeholder="Approximate number"
                    />
                  </div>
                  <div>
                    <label htmlFor="budget">Overall Event Budget</label>
                    <select id="budget" name="budget" defaultValue="">
                      <option value="">Select a range</option>
                      <option>Under $5,000</option>
                      <option>$5,000–$10,000</option>
                      <option>$10,000–$20,000</option>
                      <option>$20,000–$40,000</option>
                      <option>$40,000+</option>
                      <option>Undecided</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="planningLevel">Planning Support</label>
                    <select
                      id="planningLevel"
                      name="planningLevel"
                      defaultValue=""
                    >
                      <option value="">Select support</option>
                      <option>Full Planning</option>
                      <option>Partial Planning</option>
                      <option>Event-Day Coordination</option>
                      <option>Not Sure Yet</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="progress">Planning Progress</label>
                    <select id="progress" name="progress" defaultValue="">
                      <option value="">Where are you up to?</option>
                      <option>Just Starting</option>
                      <option>Partly Organised</option>
                      <option>Nearly Ready</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="duration">Event Duration</label>
                    <select id="duration" name="duration" defaultValue="">
                      <option value="">Select duration</option>
                      <option>Under 4 Hours</option>
                      <option>4–6 Hours</option>
                      <option>6–8 Hours</option>
                      <option>Full Day</option>
                      <option>Undecided</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="location">Venue or Preferred Area</label>
                    <input
                      id="location"
                      name="location"
                      placeholder="Venue name, suburb or preferred location"
                    />
                  </div>
                </div>

                <div className="mt-9">
                  <label>What Have You Already Booked?</label>
                  <div className="flex flex-wrap gap-2">
                    {bookedOptions.map((option) => (
                      <button
                        key={option}
                        type="button"
                        aria-pressed={booked.includes(option)}
                        onClick={() => toggle(option, booked, setBooked)}
                        className={`choice ${
                          booked.includes(option) ? "active" : ""
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-9">
                  <label>What Would You Like Us to Handle?</label>
                  <div className="flex flex-wrap gap-2">
                    {supportOptions.map((option) => (
                      <button
                        key={option}
                        type="button"
                        aria-pressed={support.includes(option)}
                        onClick={() => toggle(option, support, setSupport)}
                        className={`choice ${
                          support.includes(option) ? "active" : ""
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-9">
                  <label htmlFor="vision">Your Event Vision & Priorities</label>
                  <textarea
                    id="vision"
                    name="vision"
                    rows={5}
                    placeholder="Tell us about the atmosphere, ideas and details that matter most to you..."
                  />
                </div>

                <div className="mt-6">
                  <label htmlFor="consultation">Preferred Consultation</label>
                  <select
                    id="consultation"
                    name="consultation"
                    defaultValue=""
                  >
                    <option value="">Select a preference</option>
                    <option>Phone Call</option>
                    <option>Video Call</option>
                    <option>In-Person Coffee</option>
                  </select>
                </div>

                {submitError && <p role="alert" className="mt-6 text-sm text-[#754B35]">{submitError}</p>}

                <button
                  type="submit"
                  disabled={submitting}
                  className="mt-10 w-full bg-[#96694C] px-8 py-5 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[#754B35]"
                >
                  {submitting ? "Sending…" : "Send Enquiry →"}
                </button>

                <p className="mt-5 text-center text-xs text-[#887469]">
                  We use your details to respond to your enquiry.
                </p>
                </fieldset>
              </form>
            )}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="bg-[#49362D] px-6 py-14 text-[#F5F1EA] md:px-12">
          <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <img src="/mythos-branding/logo-final.png" alt="MYTHOS" width="180" height="26" loading="lazy" className="h-auto w-44 brightness-0 invert" />
              <p className="mt-2 text-xs uppercase tracking-[0.3em]">
                Planning
              </p>
              <p className="mt-5 text-sm text-[#D8C7B9]">
                Every detail considered. Every moment remembered.
              </p>
            </div>

            <div className="text-sm leading-8">
              <a
                href="mailto:planning@mythosentertainment.com.au"
                className="block hover:underline"
              >
                planning@mythosentertainment.com.au
              </a>
              <a href="/" className="block hover:underline">
                Visit MYTHOS Entertainment
              </a>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
