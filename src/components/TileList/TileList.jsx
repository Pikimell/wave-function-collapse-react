import { useDispatch, useSelector } from 'react-redux';
import style from './TileList.module.css';
import { selectCurrentTile, selectTiles } from '../../redux/tiles/selector';
import UploadTile from '../custom/UploadTile/UploadTile';
import TileBlock from '../custom/TileBlock/TileBlock';
import { useEffect, useMemo } from 'react';
import { useListener } from '../../hooks/useListener';
import { removeTile } from '../../redux/tiles/slice';

const TileList = () => {
  const currentTile = useSelector(selectCurrentTile);
  const tiles = useSelector(selectTiles);
  const dispatch = useDispatch();

  useListener(
    {
      event: 'keydown',
      callback: e => {
        if (e.code === 'Backspace') {
          dispatch(removeTile(currentTile?.id));
        }
      },
    },
    [currentTile],
  );

  const tileList = useMemo(() => {
    return Object.values(tiles);
  }, [tiles]);

  return (
    <div className={style.container}>
      <h4 className={style.title}>FRAMES</h4>

      <ul className={style.list}>
        {tileList.map(tile => {
          const isActiveTile = currentTile?.id === tile?.id;
          return (
            <li key={tile.id} className={style.tile}>
              <TileBlock tile={tile} isActive={isActiveTile} />
            </li>
          );
        })}
        <UploadTile />
      </ul>
    </div>
  );
};

export default TileList;
