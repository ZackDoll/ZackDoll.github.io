import { Link } from 'react-router-dom';
import { blogPosts } from '../../data/blogPosts';
import BlogCard from '../../components/BlogCard';
import Footer from '../../components/Footer';
import styles from './BlogIndex.module.css';

export default function BlogIndex() {
  return (
    <div>
      <div className={styles.blogArchiveHeader}>
        <Link to="/#blog" className={styles.backButton}>← back to portfolio</Link>
      </div>

      <section className={styles.blogArchive}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionNumber}>all</div>
          <h1 className={styles.sectionTitle}>Blog Posts</h1>
        </div>

        <div className={styles.blogGrid}>
          {blogPosts.map((post) => (
            <BlogCard post={post} archive key={post.slug} />
          ))}
        </div>
      </section>

      <Footer variant="sub" />
    </div>
  );
}
