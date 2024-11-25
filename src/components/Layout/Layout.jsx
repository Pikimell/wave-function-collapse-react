import Header from '../Header/Header';
import style from './Layout.module.css';
import Footer from '../Footer/Footer';

const Layout = ({ children }) => {
  return (
    <div className={style.container}>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
