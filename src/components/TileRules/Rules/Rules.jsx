import { useDispatch, useSelector } from 'react-redux';
import style from './Rules.module.css';
import { selectTiles } from '../../../redux/tiles/selector';
import TileBlock from '../../custom/TileBlock/TileBlock';
import SelectTile from '../../custom/SelectTile/SelectTile';
import { addRule, removeRule } from '../../../redux/tiles/slice';

const Rules = ({ tile, type = 'left' }) => {
  const dispatch = useDispatch();
  const tiles = useSelector(selectTiles);
  const ruleList = tile.rules[type];

  const handleSave = currentTileIds => {
    for (const id of currentTileIds) {
      const data = {
        oldTile: tile,
        tileId: tile.id,
        ruleType: type,
        ruleValue: id,
      };
      dispatch(addRule(data));
    }
  };

  const handleDelete = ruleId => {
    const data = {
      tileId: tile.id,
      ruleType: type,
      ruleId,
    };
    dispatch(removeRule(data));
  };

  return (
    <div className={style['rule-container']}>
      <p className={style.title}>{type.toUpperCase()}</p>
      <div className={style.line}></div>
      <ul className={style.list}>
        <li className={style['tile-container']}>
          <SelectTile blackList={ruleList} onSave={handleSave} />
        </li>
        {ruleList.toReversed().map(tileId => {
          const tile = tiles[tileId];
          return (
            <li key={tileId} className={style['tile-container']}>
              <TileBlock
                tile={tile}
                onClick={() => handleDelete(tileId)}
                showActive={false}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Rules;
