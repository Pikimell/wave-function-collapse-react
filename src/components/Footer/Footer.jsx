import style from './Footer.module.css';
import { useState } from 'react';

const Footer = ({}) => {
  return (
    <footer className={style.footer}>
      Powered By Patona Student, {new Date().getFullYear()}
    </footer>
  );
};

export default Footer;
