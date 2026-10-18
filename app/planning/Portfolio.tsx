import styles from './Portfolio.module.css';

const projects = [
  { id: 'christopher', category: 'Christenings & family celebrations', title: 'Christopher’s christening', description: 'Full planning for George and Ali’s baby boy, from the church arrangements through to the celebration afterwards. Photography from the church ceremony.', images: ['Christopher with family at his christening', 'Family and guests gathered for Christopher’s christening', 'Christening clothing and keepsake details'] },
  { id: 'cranbrook', category: 'Formal after-parties', title: 'Cranbrook formal after-party', description: 'After-party planning at Arcade, including venue sourcing, photography and DJ coordination.', images: ['Guests at the Cranbrook Year 12 formal after-party at Arcade', 'The dance floor at the Cranbrook formal after-party', 'Guests celebrating on the dance floor at Arcade'] },
  { id: 'azaliah', category: 'Christenings & family celebrations', title: 'Azaliah’s christening', description: 'Full planning from church to backyard celebration: décor, barbecue, cleaners, cake, desserts, stationery and backdrops.', images: ['Azaliah with her mother at her christening celebration', 'Family gathered at Azaliah’s christening celebration', 'Azaliah’s christening shoes and keepsake details'] },
  { id: 'eleni', category: 'Birthdays & milestones', title: 'Eleni’s 14th birthday', description: 'Full planning for a 14th birthday celebration, bringing the details together so the family could enjoy the occasion.', images: ['Friends together at Eleni’s 14th birthday celebration'] },
  { id: 'mythos', category: 'Live events & experiences', title: 'MYTHOS Entertainment', description: 'Our own events across PELICANO, HOME THE VENUE and AURA.', images: ['MYTHOS guests at PELICANO', 'MYTHOS at HOME THE VENUE', 'MYTHOS at AURA'] },
];

export default function Portfolio() {
  return <section id="work" className={styles.section}>
    <div className={styles.heading}><div><p className={styles.eyebrow}>A selection of our work</p><h2>Real occasions.<br />Lasting memories.</h2></div><p>Family celebrations, milestone moments and nights that bring people together.</p></div>
    <div className={styles.grid}>{projects.map(project => <article key={project.id} className={styles.project}>
      <img className={styles.cover} src={`/planning/portfolio/${project.id}-1.webp`} alt={project.images[0]} width={1400} height={1000} loading="lazy" />
      <div className={styles.caption}><p className={styles.eyebrow}>{project.category}</p><h3>{project.title}</h3><p>{project.description}</p></div>
      <details className={styles.details}><summary>View {project.images.length === 1 ? 'photo' : `${project.images.length} photos`}<span aria-hidden="true">+</span></summary><div className={styles.photos}>{project.images.map((alt, index) => <a href={`/planning/portfolio/${project.id}-${index + 1}.webp`} key={alt} target="_blank" rel="noreferrer" aria-label={`Open full photo: ${alt}`}><img src={`/planning/portfolio/${project.id}-${index + 1}.webp`} alt={alt} width={1400} height={1000} loading="lazy" /></a>)}</div></details>
    </article>)}</div>
  </section>;
}
