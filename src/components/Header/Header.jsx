import Logo from '../custom/Logo/Logo';
import Navigation from '../Navigation/Navigation';
import style from './Header.module.css';

const Header = () => {
  return (
    <header className={style.header}>
      <Logo />
      <Navigation />
    </header>
  );
};

export default Header;
