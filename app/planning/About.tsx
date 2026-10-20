import styles from './About.module.css';

export default function About() {
  return <section id="about" className={styles.section}>
    <div className={styles.heading}><p className={styles.eyebrow}>The people behind MYTHOS</p><h2>FRIENDS FIRST<br />MYTHOS FOLLOWED</h2></div>
    <div className={styles.storyGrid}>
      <div className={styles.story}>
        <p className={styles.lead}>We’re Terry and Anton. We love taking an idea and bringing it to life, then seeing people enjoy what we’ve created.</p>
        <p>Friends since primary school, we share Greek roots, an energetic approach and a love of bringing people together. What we enjoy most is the moment a plan becomes real: the details falling into place, the guests arriving and the hosts getting to enjoy it all.</p>
        <p>Our experience creating MYTHOS events grew into a passion for planning occasions that feel personal to the people behind them. From shaping the first idea to coordinating suppliers and the day itself, we care as much about how your event feels as how it looks.</p>
        <p>MYTHOS means story or legend in Greek. For us, it’s about helping you create a story of your own, through an occasion that reflects you and the people you’re sharing it with.</p>
      </div>
      <figure className={styles.founderPhoto}><img src="/planning/terry-anton-first-event.webp" alt="Terry and Anton together at the first event they organised" width={1268} height={1241} loading="lazy" /><figcaption>Terry &amp; Anton · The first event we organised</figcaption></figure>
    </div>
    <div className={styles.nextChapter}>
      <h3>FROM OUR CELEBRATIONS TO YOURS</h3>
      <div><p>We take the stress and hassle out of event planning, turning your ideas into a clear plan and bringing the right people together. From coordinating suppliers to looking after the details on the day, we handle the moving parts so you can relax and enjoy the celebration with your guests.</p><p>We plan birthdays and milestones, christenings, engagements, weddings, corporate events, formal after-parties, live events and other occasions. Whatever you’re imagining, our aim is the same: something personal to you, thoughtfully organised, so you can be present and enjoy it.</p><a href="#enquiry">Let’s plan your event</a></div>
    </div>
  </section>;
}
