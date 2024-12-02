import styles from './GettingStarted.module.css';

const GettingStarted = () => {
  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Getting Started</h1>
      <p className={styles.description}>
        Follow these steps to begin using the Map Generator and create your own
        2D maps.
      </p>
      <ol className={styles.steps}>
        <li>
          <strong>Prepare your tiles:</strong> Ensure you have square images for
          your tiles, preferably in PNG or JPG format.
        </li>
        <li>
          <strong>Upload your tiles:</strong> Navigate to the "Upload Tiles" tab
          and add your tile images to the system.
        </li>
        <li>
          <strong>Set rules:</strong> Define how each tile can connect with
          others (e.g., which tiles can be placed to the left, right, above, or
          below).
        </li>
        <li>
          <strong>Generate your map:</strong> Go to the "Generate Map" tab,
          configure the map size and block dimensions, and click "Generate."
        </li>
      </ol>
      <p className={styles.footer}>
        You’re now ready to create! Proceed to the next step to upload your
        tiles.
      </p>
    </section>
  );
};

export default GettingStarted;
