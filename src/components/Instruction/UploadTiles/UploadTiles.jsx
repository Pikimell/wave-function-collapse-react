import React from 'react';
import styles from './UploadTiles.module.css';

const UploadTiles = () => {
  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Upload and Configure Tiles</h1>
      <p className={styles.description}>
        This step allows you to upload your own tiles and configure their
        possible connections. Follow these instructions:
      </p>
      <ol className={styles.steps}>
        <li>
          <strong>Select tiles to upload:</strong> Click the "Upload" button and
          choose square images (PNG or JPG) from your computer.
        </li>
        <li>
          <strong>Preview your tiles:</strong> After uploading, all tiles will
          appear in the preview section. Ensure the tiles are displayed
          correctly.
        </li>
        <li>
          <strong>Set tile connections:</strong> For each tile, define which
          other tiles can be placed on the left, right, above, and below.
        </li>
        <li>
          <strong>Save your configuration:</strong> Once all tiles are
          configured, click the "Save" button to proceed to the next step.
        </li>
      </ol>
      <p className={styles.footer}>
        Ready to proceed? Go to the next step to start generating your map!
      </p>
    </section>
  );
};

export default UploadTiles;
