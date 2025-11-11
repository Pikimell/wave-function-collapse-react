import style from './Footer.module.css';

const Footer = ({}) => {
  return (
    <footer className={style.footer}>
      Powered By Pashchenko Volodymyr, {new Date().getFullYear()}
    </footer>
  );
};

export default Footer;
