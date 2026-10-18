import styles from './Portfolio.module.css';

const projects = [
  { id: 'christopher', category: 'Christenings & family celebrations', title: 'Christopher’s christening', description: 'Full planning for George and Ali’s baby boy, from the church arrangements through to the celebration afterwards. Photography from the church ceremony.', cover: 'christopher-cover-v2.webp', alt: 'Christopher with his parents at his christening', position: 'center 60%', href: undefined },
  { id: 'cranbrook', category: 'Formal after-parties', title: 'Cranbrook formal after-party', description: 'After-party planning at Arcade, including venue sourcing, photography and DJ coordination.', cover: 'cranbrook-cover-v2.webp', alt: 'Friends celebrating at the Cranbrook formal after-party at Arcade', position: 'center 35%', href: undefined },
  { id: 'eleni', category: 'Birthdays & milestones', title: 'Eleni’s 14th birthday', description: 'Full planning for a 14th birthday celebration, bringing the details together so the family could enjoy the occasion.', cover: 'eleni-1.webp', alt: 'Friends together at Eleni’s 14th birthday celebration', position: 'center 35%', href: undefined },
  { id: 'mythos', category: 'Live events & experiences', title: 'MYTHOS Entertainment', description: 'Our own events across PELICANO, HOME THE VENUE and AURA.', cover: 'mythos-cover-v2.webp', alt: 'MYTHOS crowd and stage at HOME THE VENUE', position: 'center 55%', href: 'https://www.mythosentertainment.com.au/' },
];

export default function Portfolio() {
  return <section id="work" className={styles.section}>
    <div className={styles.heading}><div><p className={styles.eyebrow}>A selection of our work</p><h2>Real occasions.<br />Lasting memories.</h2></div><p>Family celebrations, milestone moments and nights that bring people together.</p></div>
    <div className={styles.grid}>{projects.map(project => {
      const cover = <img className={styles.cover} src={`/planning/portfolio/${project.cover}`} alt={project.alt} style={{ objectPosition: project.position }} width={1400} height={1050} loading="lazy" />;
      return <article key={project.id} className={styles.project}>
        {project.href ? <a className={styles.coverLink} href={project.href} target="_blank" rel="noreferrer" aria-label="Visit the MYTHOS Entertainment website (opens in a new tab)">{cover}</a> : cover}
        <div className={styles.caption}><p className={styles.eyebrow}>{project.category}</p><h3>{project.title}</h3><p>{project.description}</p></div>
        {project.href && <a className={styles.websiteLink} href={project.href} target="_blank" rel="noreferrer">Visit MYTHOS Entertainment</a>}
      </article>;
    })}</div>
  </section>;
}
