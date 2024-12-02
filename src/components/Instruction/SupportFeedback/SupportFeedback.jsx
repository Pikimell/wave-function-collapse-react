import React from 'react';
import styles from './SupportFeedback.module.css';

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
          <strong>Email:</strong> support@mapgenerator.com
        </li>
        <li>
          <strong>Phone:</strong> +1 (123) 456-7890
        </li>
        <li>
          <strong>Live Chat:</strong> Available on our website during business
          hours.
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
