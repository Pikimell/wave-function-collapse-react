import React from 'react';
import styles from './ExamplesAndTips.module.css';
import example1 from '../../../assets/examples/example-1.png';
import example2 from '../../../assets/examples/example-2.png';

const ExamplesAndTips = () => {
  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Examples and Tips</h1>
      <p className={styles.description}>
        Explore some examples of generated maps and follow these tips to create
        the best results for your project.
      </p>
      <h2 className={styles.subtitle}>Examples</h2>
      <div className={styles.examples}>
        <img src={example1} alt="Example Map 1" className={styles.image} />
        <img src={example2} alt="Example Map 2" className={styles.image} />
      </div>
      <h2 className={styles.subtitle}>Tips</h2>
      <ul className={styles.tips}>
        <li>
          Use a consistent style for your tiles to create a cohesive map
          appearance.
        </li>
        <li>
          Test different configurations of tile connections to see how they
          affect the generated map.
        </li>
        <li>
          Start with a small map size when experimenting with new tile sets.
        </li>
        <li>Save your configurations often to avoid losing your settings.</li>
      </ul>
      <p className={styles.footer}>
        Ready to apply these tips? Go back and refine your tiles or generate a
        new map!
      </p>
    </section>
  );
};

export default ExamplesAndTips;
