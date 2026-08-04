import { useEffect } from 'react';
import styles from './Lightbox.module.css';

export default function Lightbox({ image, onClose }) {
  useEffect(() => {
    if (!image) return;

    document.body.style.overflow = 'hidden';
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [image, onClose]);

  if (!image) return null;

  return (
    <div className={`${styles.imageLightbox} ${styles.active}`} onClick={onClose}>
      <button className={styles.lightboxClose} onClick={onClose}>×</button>
      <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
        <img src={image.src} alt={image.alt} />
        <div className={styles.lightboxCaption}>{image.alt}</div>
      </div>
    </div>
  );
}
