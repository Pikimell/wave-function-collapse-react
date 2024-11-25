import Link from '../custom/Link/Link';
import style from './Navigation.module.css';

const Navigation = ({}) => {
  return (
    <nav className={style.navigation}>
      <Link to="/">Home</Link>
      <Link to="/frames">Frames</Link>
      <Link to="/generation">Generation</Link>
    </nav>
  );
};

export default Navigation;
