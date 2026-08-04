import { Link } from 'react-router-dom';
import { formatDate } from '../utils/formatDate';
import styles from './BlogCard.module.css';

export default function BlogCard({ post, archive = false }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className={`${styles.card} ${archive ? styles.archiveCard : ''}`}
    >
      <div className={styles.date}>{formatDate(post.date)}</div>
      <h3 className={styles.title}>{post.title}</h3>
      <p className={styles.excerpt}>{post.excerpt}</p>
      <div className={styles.meta}>
        <div className={styles.tags}>
          {post.tags.map((tag) => (
            <span className={styles.tag} key={tag}>{tag}</span>
          ))}
        </div>
        <div className={styles.readTime}>{post.readTime}</div>
      </div>
    </Link>
  );
}
