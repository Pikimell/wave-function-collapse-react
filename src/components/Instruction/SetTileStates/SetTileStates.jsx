import React from 'react';
import styles from './SetTileStates.module.css';

const SetTileStates = () => {
  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Configure Tile Connections</h1>
      <p className={styles.description}>
        In this step, you'll define the rules for how each tile can connect with
        others. This ensures that the generated map follows your design logic.
      </p>
      <ol className={styles.steps}>
        <li>
          <strong>Select a tile:</strong> Click on a tile from the uploaded list
          to start configuring its connections.
        </li>
        <li>
          <strong>Set possible neighbors:</strong> For each direction (left,
          right, top, bottom), choose which tiles can be placed.
        </li>
        <li>
          <strong>Use preview:</strong> Use the preview feature to visualize the
          connections and ensure they match your expectations.
        </li>
        <li>
          <strong>Save configurations:</strong> After configuring all tiles,
          click "Save" to store the settings and proceed to map generation.
        </li>
      </ol>
      <p className={styles.footer}>
        Ensure all tiles are configured before moving forward. Proper
        configuration guarantees a well-structured map.
      </p>
    </section>
  );
};

export default SetTileStates;
