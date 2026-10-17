"use client";

import { useState, type FormEvent } from "react";

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

        .planning-page a:focus-visible,
        .planning-page button:focus-visible {
          outline: 2px solid #754b35;
          outline-offset: 4px;
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

      <div className="planning-page pt-[80px]">
        {/* NAVIGATION */}
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-[#D9CDC0] bg-[#F5F1EA]/95 backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-5 md:px-12">
            <a
              href="/"
              className="text-xs uppercase tracking-[0.18em] text-[#96694C]"
            >
              MYTHOS ENTERTAINMENT
            </a>

            <a
              href="#enquiry"
              className="bg-[#96694C] px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-[#754B35]"
            >
              Plan Your Event
            </a>
          </div>
        </header>

        {/* HERO */}
        <section className="relative flex min-h-[85vh] items-center overflow-hidden bg-[#E9DFD3] px-6 py-24 md:px-12">
          <div className="pointer-events-none absolute -right-24 top-0 h-[550px] w-[550px] rounded-full border border-[#C8AF9A]/50" />
          <div className="pointer-events-none absolute -right-10 top-16 h-[420px] w-[420px] rounded-full border border-[#C8AF9A]/50" />

          <div className="relative mx-auto w-full max-w-7xl">
            <p className="mb-8 text-xs uppercase tracking-[0.35em] text-[#96694C]">
              MYTHOS PLANNING
            </p>

            <h1 className="editorial max-w-4xl text-5xl leading-[1.08] md:text-7xl lg:text-8xl">
              Every detail considered.
              <br />
              <span className="italic text-[#96694C]">
                Every moment remembered.
              </span>
            </h1>

            <p className="mt-9 max-w-xl text-base leading-8 text-[#6B5549]">
              Thoughtful event planning for life's most meaningful
              celebrations. Beautifully considered, effortlessly experienced.
            </p>

            <a
              href="#enquiry"
              className="mt-10 mr-6 inline-block bg-[#96694C] px-6 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-[#754B35]"
            >
              Plan Your Event
            </a>

            <a
              href="#services"
              className="mt-10 inline-block border-b border-[#96694C] pb-2 text-xs uppercase tracking-[0.2em] text-[#96694C]"
            >
              Explore Our Services ↓
            </a>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="px-6 py-24 md:px-12 md:py-32">
          <div className="mx-auto max-w-7xl">
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
          <div className="mx-auto grid max-w-7xl items-center gap-14 md:grid-cols-2">
            <div className="flex aspect-[4/5] items-center justify-center border border-[#BCA58F] bg-[#D9C8B6] p-10 text-center">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-[#96694C]">
                  The People Behind The Moments
                </p>
                <p className="editorial mt-6 text-5xl italic text-[#96694C]">
                  MYTHOS
                </p>
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
          <div className="mx-auto max-w-7xl">
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
              <p className="editorial text-3xl">MYTHOS</p>
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
