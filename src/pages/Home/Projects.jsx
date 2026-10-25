import { Link } from 'react-router-dom';
import Reveal from '../../components/Reveal';
import SectionHeader from '../../components/SectionHeader';
import { projects } from '../../data/projects';
import styles from './Projects.module.css';

export default function Projects() {
  return (
    <section id="projects">
      <SectionHeader number="04" title="Featured Projects" />
      <div className={styles.list}>
        {projects.map((project, i) => {
          // A caseStudyImage override swaps the cover image; caseStudyImageFit
          // opts into 'contain' for media whose own aspect ratio doesn't match
          // the default 4:3 box — the box is resized to the image's own ratio
          // instead, so it fills edge-to-edge with nothing cropped or padded.
          const image = project.caseStudyImage || project.gallery?.[0] || { src: project.icon, alt: project.title };
          const isMark = project.caseStudyImageFit === 'contain';
          return (
            <Reveal
              as={Link}
              to={`/projects/${project.slug}`}
              className={`${styles.row} ${i % 2 ? styles.reverse : ''}`}
              key={project.slug}
              delay={Math.min(i, 3) * 80}
            >
              <div className={`${styles.media} ${isMark ? styles.mediaMark : ''}`}>
                <img src={image.src} alt={image.alt} loading="lazy" />
              </div>
              <div className={styles.content}>
                <p className={styles.index}>{String(i + 1).padStart(2, '0')}</p>
                <h3 className={styles.title}>{project.title}</h3>
                <p className={styles.description}>{project.cardSubtitle}</p>
                <div className={styles.tags}>
                  {project.tags.map((tag) => (
                    <span className={styles.tag} key={tag}>{tag}</span>
                  ))}
                </div>
                <span className={styles.link}>View project →</span>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
