import React from 'react';
import styles from './Troubleshooting.module.css';

const Troubleshooting = () => {
  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Troubleshooting</h1>
      <p className={styles.description}>
        Encountering issues while using the Map Generator? Here are some common
        problems and their solutions.
      </p>
      <h2 className={styles.subtitle}>Common Issues</h2>
      <ul className={styles.issues}>
        <li>
          <strong>Problem:</strong> Tiles are not uploading correctly.
          <br />
          <strong>Solution:</strong> Ensure the file format is PNG or JPG and
          the file size is within the allowed limit.
        </li>
        <li>
          <strong>Problem:</strong> Generated map looks incorrect or chaotic.
          <br />
          <strong>Solution:</strong> Check the tile connections to ensure they
          are properly configured. Misaligned rules can lead to unexpected
          results.
        </li>
        <li>
          <strong>Problem:</strong> Map generation is slow or fails to complete.
          <br />
          <strong>Solution:</strong> Try reducing the map size or block
          dimensions. Ensure your browser has enough resources available.
        </li>
        <li>
          <strong>Problem:</strong> Exported map doesn’t load in the game
          engine.
          <br />
          <strong>Solution:</strong> Verify the exported file format matches
          your engine's requirements (e.g., PNG or JSON).
        </li>
      </ul>
      <p className={styles.footer}>
        Still facing issues? Contact our support team for additional assistance.
      </p>
    </section>
  );
};

export default Troubleshooting;
