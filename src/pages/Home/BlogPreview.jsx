import { Link } from 'react-router-dom';
import SectionHeader from '../../components/SectionHeader';
import BlogCard from '../../components/BlogCard';
import { blogPosts } from '../../data/blogPosts';
import Newsletter from './Newsletter';
import styles from './BlogPreview.module.css';

export default function BlogPreview() {
  const recentPosts = blogPosts.slice(0, 2);

  return (
    <section id="blog">
      <SectionHeader number="04" title="Recent Blog Posts" />

      <div className={styles.blogGrid}>
        {recentPosts.map((post) => (
          <BlogCard post={post} key={post.slug} />
        ))}
      </div>

      <Newsletter />

      <div className={styles.viewAllContainer}>
        <Link to="/blog" className={styles.viewAllLink}>View All Posts →</Link>
      </div>
    </section>
  );
}
