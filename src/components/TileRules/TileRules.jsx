import { useSelector } from 'react-redux';
import style from './TileRules.module.css';
import { useState } from 'react';
import { selectCurrentTile } from '../../redux/tiles/selector';
import Rules from './Rules/Rules';

const TileRules = () => {
  const tile = useSelector(selectCurrentTile);

  return (
    <div className={style.container}>
      <h4 className={style.title}>RULES</h4>

      {tile && (
        <ul className={style['rules-list']}>
          <li>
            <Rules tile={tile} type="up" onSelect={null} />
          </li>
          <li>
            <Rules tile={tile} type="down" onSelect={null} />
          </li>
          <li>
            <Rules tile={tile} type="left" onSelect={null} />
          </li>
          <li>
            <Rules tile={tile} type="right" onSelect={null} />
          </li>
        </ul>
      )}
    </div>
  );
};

export default TileRules;
