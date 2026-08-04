import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import SectionHeader from '../../components/SectionHeader';
import { trackEvent } from '../../utils/gtag';
import styles from './Contact.module.css';

const EMAILJS_PUBLIC_KEY = 'swEV8Ik2BLzd0I-an';
const EMAILJS_SERVICE_ID = 'service_ik634s7';
const EMAILJS_TEMPLATE_ID = 'template_7pp3rp9';

export default function Contact() {
  const formRef = useRef(null);
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  const handleSubmit = (e) => {
    e.preventDefault();

    trackEvent('form_submit', {
      event_category: 'contact',
      event_label: 'contact_form',
    });

    setStatus('sending');

    emailjs
      .sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formRef.current, { publicKey: EMAILJS_PUBLIC_KEY })
      .then(() => {
        setStatus('sent');
        formRef.current?.reset();
        setTimeout(() => setStatus('idle'), 3000);
      })
      .catch((error) => {
        console.error('EmailJS error:', error);
        setStatus('error');
        setTimeout(() => setStatus('idle'), 3000);
      });
  };

  const buttonLabel = {
    idle: 'Send Message',
    sending: 'Sending...',
    sent: 'Sent!',
    error: 'Failed to Send',
  }[status];

  const buttonClass = status === 'sent' ? styles.sent : status === 'error' ? styles.error : '';

  return (
    <section id="contact">
      <SectionHeader number="05" title="Get In Touch" />
      <div className={styles.contactWrapper}>
        <form className={styles.contactForm} ref={formRef} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="contact-name">Name</label>
            <input id="contact-name" name="from_name" type="text" required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="contact-email">Email</label>
            <input id="contact-email" name="from_email" type="email" required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="contact-message">Message</label>
            <textarea id="contact-message" name="message" required></textarea>
          </div>
          <button type="submit" className={buttonClass} disabled={status === 'sending'}>
            {buttonLabel}
          </button>
        </form>
        <div className={styles.socialLinks}>
          <a href="https://www.github.com/ZackDoll" className={styles.socialLink} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/zack-doll-6952b8272" className={styles.socialLink} target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
      </div>
    </section>
  );
}
