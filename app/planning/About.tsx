import styles from './About.module.css';

export default function About() {
  return <section id="about" className={styles.section}>
    <div className={styles.heading}><p className={styles.eyebrow}>The people behind MYTHOS</p><h2>Friends first.<br />MYTHOS followed.</h2></div>
    <div className={styles.storyGrid}>
      <div className={styles.story}>
        <p className={styles.lead}>We’re Terry and Anton. Friends since primary school, with a shared love of our community and bringing people together.</p>
        <p>MYTHOS began on a drive home from the gym. After talking about the nights we’d been out, we were convinced we could create a party of our own. We started brainstorming straight away, turning that conversation into the beginning of MYTHOS.</p>
        <p>Our Greek roots were always part of the story. Anton brought his outgoing spirit and connection to the Greek community. For Terry, feeling the distance from family in Greece made that sense of belonging especially meaningful. Together, we wanted to create somewhere people could connect, celebrate and share moments.</p>
      </div>
      <aside className={styles.meaning} aria-label="The meaning behind our name">
        <img src="/mythos-branding/logo-final.png" alt="MYTHOS" width="500" height="72" loading="lazy" />
        <p className={styles.eyebrow}>Story · Legend</p>
        <h3>A name with roots.<br />A story still unfolding.</h3>
        <p>MYTHOS means story or legend in Greek. For us, it represents experiences that become stories worth sharing long after the celebration is over.</p>
      </aside>
    </div>
    <div className={styles.founders}>
      <article><p className={styles.eyebrow}>Creative direction &amp; vision</p><h3>Terry</h3><p>Creative direction, marketing, branding and the overall vision of each event.</p></article>
      <article><p className={styles.eyebrow}>Entertainment &amp; delivery</p><h3>Anton</h3><p>Entertainment, logistics, supplier relationships and bringing everything together on the day.</p></article>
    </div>
    <div className={styles.nextChapter}>
      <h3>From our celebrations<br />to yours.</h3>
      <div><p>We both shape the planning and decisions behind every event. Creating our own MYTHOS nights taught us how much we enjoy the whole process, from the first idea to seeing a room come to life. Along the way, we built relationships with venues, suppliers and entertainers.</p><p>Private event planning became a natural next step: bringing that same creativity, care and energy to your birthday, christening or celebration. Something personal to you, thoughtfully organised, so you can enjoy it with your people.</p><a href="#enquiry">Let’s plan your celebration</a></div>
    </div>
  </section>;
}
