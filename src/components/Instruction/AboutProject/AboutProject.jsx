import React from 'react';
import styles from './AboutProject.module.css';

const AboutProject = () => {
  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Welcome to the Map Generator</h1>
      <p className={styles.description}>
        This project is a tool designed to help game developers and hobbyists
        generate 2D maps using the Wave Function Collapse algorithm. With this
        tool, you can:
      </p>
      <ul className={styles.list}>
        <li>Upload your own tiles to create unique map designs.</li>
        <li>Set rules for how tiles can connect to each other.</li>
        <li>Generate maps of customizable size and block dimensions.</li>
      </ul>
      <p className={styles.footer}>
        Follow the step-by-step instructions in this guide to start creating
        your own maps!
      </p>
    </section>
  );
};

export default AboutProject;
