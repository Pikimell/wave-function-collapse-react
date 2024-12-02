import React from 'react';
import styles from './GoToGeneration.module.css';

const GoToGeneration = () => {
  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Proceed to Map Generation</h1>
      <p className={styles.description}>
        Once your tiles are uploaded and all connections are configured, you're
        ready to proceed to the map generation step.
      </p>
      <ol className={styles.steps}>
        <li>
          <strong>Review your configurations:</strong> Ensure all tiles have
          their possible connections set up correctly.
        </li>
        <li>
          <strong>Navigate to the generation page:</strong> Click on the
          "Generate Map" tab in the navigation menu.
        </li>
        <li>
          <strong>Prepare for generation:</strong> Familiarize yourself with the
          available options for map size and block dimensions.
        </li>
      </ol>
      <p className={styles.footer}>
        Once you're ready, head over to the generation page to start creating
        your unique map!
      </p>
    </section>
  );
};

export default GoToGeneration;
