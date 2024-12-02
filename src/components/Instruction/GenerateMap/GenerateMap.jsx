import React from 'react';
import styles from './GenerateMap.module.css';

const GenerateMap = () => {
  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Generate Your Map</h1>
      <p className={styles.description}>
        Now that you've set all parameters and configured your tiles, it's time
        to generate your map! Follow these steps:
      </p>
      <ol className={styles.steps}>
        <li>
          <strong>Review your settings:</strong> Double-check the map size,
          block dimensions, and tile configurations.
        </li>
        <li>
          <strong>Click "Generate Map":</strong> Press the button to start the
          map generation process.
        </li>
        <li>
          <strong>Preview the result:</strong> Once the map is generated, you
          will see a preview. Inspect it to ensure it meets your expectations.
        </li>
        <li>
          <strong>Make adjustments (if needed):</strong> If the map doesn't look
          right, go back and modify the tile configurations or generation
          parameters.
        </li>
      </ol>
      <p className={styles.footer}>
        Satisfied with your map? Save it and use it in your project!
      </p>
    </section>
  );
};

export default GenerateMap;
