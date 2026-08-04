import { useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { getProjectBySlug } from '../../data/projects';
import Footer from '../../components/Footer';
import Lightbox from '../../components/Lightbox';
import styles from './ProjectDetail.module.css';

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);
  const [lightboxImage, setLightboxImage] = useState(null);

  if (!project) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className={styles.projectDetailPage}>
      <Link to="/#projects" className={styles.backButton}>← back to projects</Link>

      <div className={styles.projectDetailHeader}>
        <h1 className={styles.projectDetailTitle}>{project.title}</h1>
        <p className={styles.projectDetailSubtitle}>{project.subtitle}</p>
        <div className={styles.projectLinks}>
          {project.links.map((link) =>
            link.href ? (
              <a
                key={link.label}
                href={link.href}
                className={styles.projectLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}
              </a>
            ) : (
              <span key={link.label} className={styles.projectLinkDisabled}>{link.label}</span>
            )
          )}
        </div>
        <div className={styles.bentoTags}>
          {project.tags.map((tag) => (
            <span className={styles.bentoTag} key={tag}>{tag}</span>
          ))}
        </div>
      </div>

      <div className={styles.projectDetailContent}>
        {project.sections.map((section) => (
          <div className={styles.projectDetailSection} key={section.heading}>
            <h3>{section.heading}</h3>
            {section.paragraphs?.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
            {section.list && (
              <ul>
                {section.list.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        ))}

        <div className={styles.projectDetailSection}>
          <h3>Gallery</h3>
          <div className={styles.projectImages}>
            {project.gallery.map((image) => (
              <div className={styles.projectImage} key={image.src}>
                <img
                  src={image.src}
                  alt={image.alt}
                  onClick={() => setLightboxImage(image)}
                />
              </div>
            ))}
          </div>
        </div>

        <div className={styles.projectDetailSection}>
          <h3>Technologies Used</h3>
          <div className={styles.techStackGrid}>
            {project.tech.map((tech) => (
              <div className={styles.techItem} key={tech}>{tech}</div>
            ))}
          </div>
        </div>
      </div>

      <Footer variant="sub" />

      <Lightbox image={lightboxImage} onClose={() => setLightboxImage(null)} />
    </div>
  );
}
