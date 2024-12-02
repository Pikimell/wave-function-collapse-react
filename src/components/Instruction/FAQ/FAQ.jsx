import React from 'react';
import styles from './FAQ.module.css';

const FAQ = () => {
  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Frequently Asked Questions (FAQ)</h1>
      <p className={styles.description}>
        Here are answers to some of the most common questions about using the
        Map Generator.
      </p>
      <h2 className={styles.subtitle}>General Questions</h2>
      <ul className={styles.faqList}>
        <li>
          <strong>Q: What file formats are supported for tiles?</strong>
          <br />
          A: The Map Generator supports PNG and JPG formats.
        </li>
        <li>
          <strong>Q: Can I use non-square tiles?</strong>
          <br />
          A: No, tiles must be square to ensure proper alignment during map
          generation.
        </li>
        <li>
          <strong>Q: What is the maximum map size I can generate?</strong>
          <br />
          A: The maximum map size depends on your system resources, but we
          recommend keeping it under 100x100 tiles for optimal performance.
        </li>
      </ul>
      <h2 className={styles.subtitle}>Technical Questions</h2>
      <ul className={styles.faqList}>
        <li>
          <strong>
            Q: How does the Wave Function Collapse algorithm work?
          </strong>
          <br />
          A: It uses constraints to determine valid tile placements,
          progressively building the map based on your configurations.
        </li>
        <li>
          <strong>Q: Can I edit a map after generating it?</strong>
          <br />
          A: Currently, the tool does not support direct map editing, but you
          can adjust settings and regenerate the map.
        </li>
        <li>
          <strong>Q: How do I export my map?</strong>
          <br />
          A: You can save your map as a PNG or JSON file through the "Save and
          Export" page.
        </li>
      </ul>
      <p className={styles.footer}>
        Have more questions? Feel free to contact our support team for help.
      </p>
    </section>
  );
};

export default FAQ;
