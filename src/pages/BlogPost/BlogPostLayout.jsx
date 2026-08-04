import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/formatDate';
import Footer from '../../components/Footer';
import styles from './BlogPost.module.css';

export default function BlogPostLayout({ meta, children }) {
  return (
    <div>
      <div className={styles.blogPostHeader}>
        <Link to="/#blog" className={styles.backButton}>← back to portfolio</Link>
      </div>

      <article className={styles.blogPost}>
        <header className={styles.blogPostHeader}>
          <div className={styles.blogPostMeta}>
            <span className={styles.blogPostDate}>{formatDate(meta.date)}</span>
            <span className={styles.blogPostReadTime}>{meta.readTime}</span>
          </div>
          <h1 className={styles.blogPostTitle}>{meta.title}</h1>
          <div className={styles.blogPostTags}>
            {meta.tags.map((tag) => (
              <span className={styles.blogTag} key={tag}>{tag}</span>
            ))}
          </div>
        </header>

        <div className={styles.blogPostContent}>
          {children}
        </div>
      </article>

      <Footer variant="sub" />
    </div>
  );
}
