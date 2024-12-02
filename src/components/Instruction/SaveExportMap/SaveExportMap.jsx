import React from 'react';
import styles from './SaveExportMap.module.css';

const SaveExportMap = () => {
  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Save and Export Your Map</h1>
      <p className={styles.description}>
        Congratulations on generating your map! In this step, you can save your
        map or export it for use in your projects.
      </p>
      <ol className={styles.steps}>
        <li>
          <strong>Review the generated map:</strong> Ensure the map meets your
          requirements. If not, go back to adjust settings and regenerate.
        </li>
        <li>
          <strong>Save your map:</strong> Click the "Save" button to store your
          map in your project library or download it locally.
        </li>
        <li>
          <strong>Export options:</strong> Choose a file format for export
          (e.g., PNG, JSON) based on your needs.
        </li>
        <li>
          <strong>Integrate the map:</strong> Use the exported file in your game
          or application development environment.
        </li>
      </ol>
      <p className={styles.footer}>
        Your map is now ready to be used! Start building amazing game levels
        with it.
      </p>
    </section>
  );
};

export default SaveExportMap;
