import React from 'react';
import styles from './SupportFeedback.module.css';
import { INSTAGRAM, LINKEDIN, TELEGRAM } from '../../../utils/constants';

const SupportFeedback = () => {
  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Support and Feedback</h1>
      <p className={styles.description}>
        We value your feedback and are here to help with any issues or
        questions. Here's how you can reach us:
      </p>
      <h2 className={styles.subtitle}>Contact Us</h2>
      <ul className={styles.contactList}>
        <li>
          <strong>Telegram:</strong> @{TELEGRAM}
        </li>
        <li>
          <strong>Instagram:</strong> @{INSTAGRAM}
        </li>
        <li>
          <strong>Linkedin:</strong> @{LINKEDIN}
        </li>
      </ul>
      <h2 className={styles.subtitle}>Feedback</h2>
      <p className={styles.feedback}>
        Have suggestions or ideas for improving the tool? We’d love to hear from
        you! Use the feedback form on our website or send us an email.
      </p>
      <p className={styles.footer}>
        Thank you for using the Map Generator. We’re excited to see what you’ll
        create!
      </p>
    </section>
  );
};

export default SupportFeedback;
