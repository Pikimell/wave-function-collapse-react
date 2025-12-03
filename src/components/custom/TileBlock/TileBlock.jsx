import style from './TileBlock.module.css';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import { selectTile } from '../../../redux/tiles/slice';

const TileBlock = ({
  className = '',
  tile,
  isActive = false,
  isSuggested = false,
  onClick,
  clickable = true,
  ...props
}) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    if (!clickable) return;
    if (onClick) onClick(tile);
    else if (tile?.id) {
      dispatch(selectTile({ projectId: tile.projectId, tileId: tile.id }));
    }
  };

  return (
    <div
      className={clsx(
        style.tile,
        isActive && style.active,
        isSuggested && style.suggested,
        className
      )}
      onClick={handleClick}
      {...props}
    >
      {tile?.url && (
        <img
          className={style.image}
          src={tile.url}
          alt="tile"
          style={{ transform: `rotate(${tile.rotation || 0}deg)` }}
        />
      )}
    </div>
  );
};

export default TileBlock;
