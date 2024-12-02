import { useSelector } from 'react-redux';
import style from './TilePreview.module.css';
import { useEffect, useState } from 'react';
import { selectCurrentTile, selectTiles } from '../../redux/tiles/selector';
import TileBlock from '../custom/TileBlock/TileBlock';
import { Flex } from 'antd';

const TilePreview = () => {
  const tiles = useSelector(selectTiles);
  const currentTile = useSelector(selectCurrentTile);

  const [tileList, setTileList] = useState({
    up: null,
    left: null,
    right: null,
    down: null,
  });

  useEffect(() => {
    if (!currentTile?.url) return;

    let i = 0;
    const rules = currentTile.rules;
    const intervalId = setInterval(() => {
      const newLeft = rules.left[i % rules.left.length];
      const newRight = rules.right[i % rules.right.length];
      const newUp = rules.up[i % rules.up.length];
      const newDown = rules.down[i % rules.down.length];

      setTileList({
        up: tiles[newUp],
        down: tiles[newDown],
        left: tiles[newLeft],
        right: tiles[newRight],
      });

      i += 1;
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [tiles, currentTile]);

  if (!currentTile?.url) return <div className={style.container}></div>;

  return (
    <div className={style.container}>
      <div>
        <TileBlock className={style.tile} tile={tileList.up} />
      </div>

      <Flex align="center" gap="5px">
        <TileBlock className={style.tile} tile={tileList.left} />
        <TileBlock className={style.tile} tile={currentTile} />
        <TileBlock className={style.tile} tile={tileList.right} />
      </Flex>

      <div>
        <TileBlock className={style.tile} tile={tileList.down} />
      </div>
    </div>
  );
};

export default TilePreview;
