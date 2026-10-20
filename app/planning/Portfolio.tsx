import styles from './Portfolio.module.css';

const projects = [
  { id: 'christopher', category: 'Weddings, christenings & engagements', title: 'Formal occasions', description: 'From weddings and christenings to engagements and other formal celebrations, we bring your vision and traditions together. We coordinate the arrangements and details so you can enjoy the occasion stress-free with your guests.', cover: 'christopher-cover-v2.webp', alt: 'A family sharing a special occasion together', position: 'center 60%', href: undefined },
  { id: 'cranbrook', category: 'School celebrations', title: 'School formals & after-parties', description: 'We work with schools and organising committees to plan memorable formals and formal after-parties. From venue sourcing and entertainment to photography and event-day coordination, we bring the details together and take the pressure off your team.', cover: 'cranbrook-cover-v2.webp', alt: 'Friends enjoying an evening celebration', position: 'center 35%', href: undefined },
  { id: 'eleni', category: 'Birthdays, milestones & celebrations', title: 'Private parties', description: 'Celebrate birthdays, milestones and special moments with a party shaped around you. We look after the venue, entertainment, suppliers and coordination so you can relax and enjoy it with your guests.', cover: 'eleni-1.webp', alt: 'Guests celebrating a special milestone together', position: 'center 35%', href: undefined },
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
