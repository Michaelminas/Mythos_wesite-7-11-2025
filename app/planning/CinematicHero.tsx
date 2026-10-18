"use client";

import { useEffect, useRef } from "react";
import styles from "./CinematicHero.module.css";
import PlanningBrand from "./PlanningBrand";

export default function CinematicHero() {
  const journey = useRef<HTMLElement>(null);
  const header = useRef<HTMLElement>(null);
  const scene = useRef<HTMLDivElement>(null);
  const foreground = useRef<HTMLDivElement>(null);
  const intro = useRef<HTMLDivElement>(null);
  const chapter = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = journey.current;
    if (!section) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const clamp = (value: number) => Math.max(0, Math.min(1, value));
    let frame = 0;
    let current = 0;
    let last = 0;
    const render = (time: number) => {
      frame = 0;
      const bounds = section.getBoundingClientRect();
      const target = preference.matches ? 0 : clamp(-bounds.top / Math.max(1, bounds.height - window.innerHeight));
      const elapsed = last ? Math.min(time - last, 64) : 16;
      last = time;
      current += (target - current) * (1 - Math.exp(-elapsed / 110));
      if (Math.abs(target - current) < 0.0002) current = target;
      if (scene.current) scene.current.style.transform = `scale(${1 + current * 0.25}) translate3d(${current * -1.2}%,${current * 2}%,0)`;
      if (foreground.current) foreground.current.style.transform = `scale(${1 + current * 0.56})`;
      if (intro.current) {
        intro.current.style.opacity = String(1 - clamp(current / 0.32));
        intro.current.style.transform = `translateY(${-current * 100}px)`;
      }
      if (chapter.current) {
        chapter.current.style.opacity = String(clamp((current - 0.32) / 0.25) * (1 - clamp((current - 0.88) / 0.12)));
        chapter.current.style.transform = `translateY(${(1 - clamp((current - 0.32) / 0.25)) * 35}px)`;
      }
      if (progress.current) progress.current.style.width = `${current * 100}%`;
      header.current?.classList.toggle(styles.light, bounds.bottom < window.innerHeight * 0.4);
      if (current !== target) frame = window.requestAnimationFrame(render);
      else last = 0;
    };
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(render); };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    preference.addEventListener("change", schedule);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      preference.removeEventListener("change", schedule);
    };
  }, []);

  return <>
    <header ref={header} className={styles.header}>
      <PlanningBrand />
      <nav aria-label="Planning sections"><a href="#services">Services</a><a href="#about">About</a><a href="#work">Our Work</a><a href="#enquiry">Contact</a></nav>
      <a className={styles.cta} href="#enquiry">Plan your event</a>
    </header>
    <section ref={journey} className={styles.journey} id="top" aria-label="MYTHOS Planning cinematic introduction">
      <div className={styles.stage}>
        <div ref={scene} className={styles.scene} /><div ref={foreground} className={styles.foreground} /><div className={styles.sun} /><div className={styles.shade} />
        <div ref={intro} className={styles.intro}><p className={styles.eyebrow}>Sydney · Event planning &amp; experiences</p><h1>Every detail considered<br /><em>Every moment remembered</em></h1></div>
        <div ref={chapter} className={styles.chapter} aria-hidden="true"><p className={styles.eyebrow}>Made personal</p><h2>Step into planning<br />your next event with us</h2></div>
        <div className={styles.bottom}><div className={styles.scrollCue}><i aria-hidden="true" /><span>Scroll to<br />step inside</span></div><span className={styles.right}>A Mediterranean spirit</span></div>
        <div className={styles.progress} aria-hidden="true"><i ref={progress} /></div>
      </div>
    </section>
  </>;
}
