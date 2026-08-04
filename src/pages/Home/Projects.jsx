import { Link } from 'react-router-dom';
import SectionHeader from '../../components/SectionHeader';
import { projects } from '../../data/projects';
import styles from './Projects.module.css';

export default function Projects() {
  return (
    <section id="projects">
      <SectionHeader number="03" title="Featured Projects" />
      <div className={styles.bentoGrid}>
        {projects.map((project) => (
          <Link to={`/projects/${project.slug}`} className={styles.bentoItem} key={project.slug}>
            <div className={styles.bentoIcon}>
              <img src={project.icon} alt={project.title} />
            </div>
            <h3 className={styles.bentoTitle}>{project.title}</h3>
            <p className={styles.bentoDescription}>{project.cardSubtitle}</p>
            <div className={styles.bentoTags}>
              {project.tags.map((tag) => (
                <span className={styles.bentoTag} key={tag}>{tag}</span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
