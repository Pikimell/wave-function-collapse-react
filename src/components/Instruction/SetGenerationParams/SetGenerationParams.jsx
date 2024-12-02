import React from 'react';
import styles from './SetGenerationParams.module.css';

const SetGenerationParams = () => {
  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Set Map Generation Parameters</h1>
      <p className={styles.description}>
        Before generating your map, you need to define some parameters. These
        settings will determine the size and structure of your map.
      </p>
      <ol className={styles.steps}>
        <li>
          <strong>Select the map size:</strong> Use the width and height fields
          to set the overall dimensions of the map.
        </li>
        <li>
          <strong>Define block dimensions:</strong> Specify the size of each
          tile block (e.g., 32x32 pixels).
        </li>
        <li>
          <strong>Optional settings:</strong> Adjust any additional parameters
          (if available) to customize the map further.
        </li>
      </ol>
      <p className={styles.footer}>
        Once the parameters are set, you’re ready to generate your map. Proceed
        to the next step to see the results!
      </p>
    </section>
  );
};

export default SetGenerationParams;
