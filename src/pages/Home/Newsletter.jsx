import { trackEvent } from '../../utils/gtag';
import styles from './Newsletter.module.css';

export default function Newsletter() {
  const handleSubmit = () => {
    trackEvent('newsletter_signup', {
      event_category: 'engagement',
      event_label: 'buttondown_newsletter',
    });
    window.open('https://buttondown.email/ZackDoll', 'popupwindow');
  };

  return (
    <div className={styles.newsletterSection}>
      <div className={styles.newsletterContainer}>
        <h3 className={styles.newsletterTitle}>Get notified of new posts!</h3>
        <p className={styles.newsletterDescription}>I don't post often, but it's sometimes worth a read</p>

        <form
          action="https://buttondown.email/api/emails/embed-subscribe/ZackDoll"
          method="post"
          target="popupwindow"
          onSubmit={handleSubmit}
          className={styles.newsletterForm}
        >
          <input
            type="email"
            name="email"
            placeholder="your@email.com"
            required
            className={styles.newsletterInput}
          />
          <button type="submit" className={styles.newsletterButton}>Subscribe!</button>
        </form>
      </div>
    </div>
  );
}
