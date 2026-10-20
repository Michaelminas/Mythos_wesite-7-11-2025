import styles from './Portfolio.module.css';

const projects = [
  { id: 'christopher', category: 'Family & tradition', title: 'Family celebrations', description: 'Thoughtfully planned occasions that bring family and friends together. We look after the arrangements and details so you can be present for the moments that matter.', cover: 'christopher-cover-v2.webp', alt: 'A family sharing a special occasion together', position: 'center 60%', href: undefined },
  { id: 'cranbrook', category: 'Parties & social events', title: 'Private parties & after-parties', description: 'From intimate gatherings to a big night with your people, we bring the venue, entertainment and suppliers together for a celebration that feels like you.', cover: 'cranbrook-cover-v2.webp', alt: 'Friends enjoying an evening celebration', position: 'center 35%', href: undefined },
  { id: 'eleni', category: 'Milestones & special occasions', title: 'Celebrations made personal', description: 'Mark life’s milestones with an occasion shaped around your vision. We take care of the planning and coordination so you can celebrate stress-free with your guests.', cover: 'eleni-1.webp', alt: 'Guests celebrating a special milestone together', position: 'center 35%', href: undefined },
  { id: 'mythos', category: 'Live events & experiences', title: 'MYTHOS Entertainment', description: 'Our own events across PELICANO, HOME THE VENUE and AURA.', cover: 'mythos-cover-v2.webp', alt: 'MYTHOS crowd and stage at HOME THE VENUE', position: 'center 55%', href: 'https://mythos-wesite-7-11-2025-git-myt-9eb2fa-mythos-projects-fac54b0d.vercel.app/' },
];

export default function Portfolio() {
  return <section id="work" className={styles.section}>
    <div className={styles.heading}><div><p className={styles.eyebrow}>A selection of our work</p><h2>REAL OCCASIONS<br />LASTING MEMORIES</h2></div><p className={styles.sideNote}><span>FAMILY CELEBRATIONS</span><span>MILESTONE MOMENTS</span><span>PEOPLE COMING TOGETHER</span></p></div>
    <div className={styles.grid}>{projects.map(project => {
      const cover = <img className={styles.cover} src={`/planning/portfolio/${project.cover}`} alt={project.alt} style={{ objectPosition: project.position }} width={1400} height={1050} loading="lazy" />;
      return <article key={project.id} className={styles.project}>
        {project.href ? <a className={styles.coverLink} href={project.href} aria-label="Visit the MYTHOS Entertainment website">{cover}</a> : cover}
        <div className={styles.caption}><p className={styles.eyebrow}>{project.category}</p><h3>{project.title}</h3><p>{project.description}</p></div>
        {project.href && <a className={styles.websiteLink} href={project.href}>Visit MYTHOS Entertainment</a>}
      </article>;
    })}</div>
  </section>;
}
