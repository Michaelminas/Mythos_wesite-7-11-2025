"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import CinematicHero from "./CinematicHero";
import Portfolio from "./Portfolio";
import About from "./About";

const services = [
  {
    number: "01",
    title: "Full Event Planning",
    description:
      "One team to bring the whole occasion together. We coordinate the venue, suppliers, entertainment, celebration details and event-day arrangements around your vision.",
  },
  {
    number: "02",
    title: "Partial Event Planning",
    description:
      "Keep the decisions you have already made. We help with the remaining pieces, whether that means finding a venue, arranging a photographer and DJ, or bringing suppliers together.",
  },
  {
    number: "03",
    title: "Event-Day Coordination",
    description:
      "You have made the plans. We coordinate the timeline, supplier arrivals, setup and running of the celebration, so you can spend the day with your guests.",
  },
];

const eventTypes = [
  "Birthday / Milestone",
  "Christening",
  "Engagement",
  "Wedding",
  "Corporate Event",
  "Formal After-Party",
  "Live Event",
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
    <main className="min-h-screen bg-[#E8E1D6] text-[#231F20]">
      <style jsx global>{`
        html:has(.planning-page), body:has(.planning-page) { overflow-x: clip; overflow-y: visible; }
        .planning-page { --planning-paper: #e8e1d6; --planning-neutral: #ded5c8; --planning-bronze: #9b694d; --planning-black: #231f20; }
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
          outline: 2px solid #231F20;
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

        .planning-page .olive-shadow { color: #756449; opacity: 0.22; filter: blur(6px); transform: rotate(-9deg); }
        @media (max-width: 600px) {
          .planning-page .olive-shadow { opacity: 0.13; left: -150px; }
        }

        .planning-page {
          font-family: "MYTHOS Helvetica", "Helvetica Neue", Helvetica, Arial, sans-serif;
        }

        .planning-page .editorial {
          font-family: "MYTHOS Helvetica", "Helvetica Neue", Helvetica, Arial, sans-serif;
          font-weight: 400;
        }

        .planning-page input,
        .planning-page select,
        .planning-page textarea {
          width: 100%;
          border: 1px solid #DED5C8;
          background: rgba(255, 255, 255, 0.72);
          padding: 14px 15px;
          border-radius: 2px;
          color: #231F20;
          outline-color: #9B694D;
        }

        .planning-page label {
          display: block;
          font-size: 12px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 9px;
        }

        .planning-page .choice {
          border: 1px solid #DED5C8;
          padding: 11px 14px;
          font-size: 13px;
          transition: all 0.2s ease;
        }

        .planning-page .choice.active {
          background: #9B694D;
          border-color: #9B694D;
          color: white;
        }
      `}</style>

      <div ref={pageRef} className="planning-page">
        <CinematicHero />

        {/* SERVICES */}
        <section id="services" className="px-6 py-24 md:px-12 md:py-32">
          <div data-reveal className="mx-auto max-w-7xl">
            <p className="mb-5 text-xs uppercase tracking-[0.3em] text-[#9B694D]">
              What We Do
            </p>
            <h2 className="editorial mb-7 text-5xl md:text-6xl">
              Planning, shaped around you
            </h2>
            <p className="mb-10 max-w-2xl text-sm leading-8">From christenings and birthday celebrations to formal after-parties and live events, choose the level of support that suits your occasion.</p>
            <div className="mb-14 flex flex-wrap gap-x-8 gap-y-3 border-y border-[#9B694D]/35 py-5 text-[10px] uppercase tracking-[0.14em]"><span>Christenings &amp; family occasions</span><span>Birthdays &amp; milestones</span><span>Formal after-parties</span><span>Live events</span></div>

            <div className="grid gap-12 md:grid-cols-3">
              {services.map((service) => (
                <article
                  key={service.number}
                  className="border-t border-[#9B694D] pt-7"
                >
                  <p className="mb-10 text-xs tracking-[0.2em] text-[#9B694D]">
                    {service.number}
                  </p>
                  <h3 className="editorial mb-6 text-3xl">
                    {service.title}
                  </h3>
                  <p className="text-sm leading-8 text-[#231F20]">
                    {service.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <About />

        <Portfolio />

        {/* ENQUIRY FORM */}
        <section
          id="enquiry"
          className="scroll-mt-24 bg-[#DED5C8] px-6 py-24 md:px-12 md:py-32"
        >
          <div className="mx-auto max-w-4xl">
            <div className="mb-14 text-center">
              <p className="mb-5 text-xs uppercase tracking-[0.3em] text-[#9B694D]">
                Let's Create Something Memorable
              </p>
              <h2 className="editorial text-5xl md:text-6xl">
                Plan Your Event
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-sm leading-8 text-[#231F20]">
                Tell us a little about your celebration. We'll be in
                touch to discuss your vision and how we can help.
              </p>
            </div>

            {submitted ? (
              <div role="status" aria-live="polite" className="border border-[#9B694D] bg-white/50 px-8 py-14 text-center">
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
                  className="mt-8 text-xs uppercase tracking-[0.2em] text-[#9B694D] underline"
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
                className="border border-[#9B694D] bg-white/35 p-6 shadow-sm md:p-12"
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
                    <p className="mt-2 text-xs text-[#9B694D]">
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

                {submitError && <p role="alert" className="mt-6 text-sm text-[#231F20]">{submitError}</p>}

                <button
                  type="submit"
                  disabled={submitting}
                  className="mt-10 w-full bg-[#9B694D] px-8 py-5 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[#231F20]"
                >
                  {submitting ? "Sending…" : "Send Enquiry →"}
                </button>

                <p className="mt-5 text-center text-xs text-[#9B694D]">
                  We use your details to respond to your enquiry.
                </p>
                </fieldset>
              </form>
            )}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="bg-[#231F20] px-6 py-14 text-[#E8E1D6] md:px-12">
          <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <img src="/mythos-branding/logo-final.png" alt="MYTHOS" width="180" height="26" loading="lazy" className="h-auto w-44 brightness-0 invert" />
              <p className="mt-2 text-xs uppercase tracking-[0.3em]">
                Planning
              </p>
              <p className="mt-5 text-sm text-[#DED5C8]">
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

