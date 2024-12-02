import style from './TileBlock.module.css';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import { selectTile } from '../../../redux/tiles/slice';

const TileBlock = ({
  className = '',
  tile,
  isActive = false,
  onClick,
  ...props
}) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    if (onClick) onClick(tile);
    else dispatch(selectTile(tile));
  };

  return (
    <div
      className={clsx(style.tile, isActive && style.active, className)}
      onClick={handleClick}
      {...props}
    >
      {tile?.url && <img className={style.image} src={tile.url} alt="tile" />}
    </div>
  );
};

export default TileBlock;
