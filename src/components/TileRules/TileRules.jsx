import { useDispatch, useSelector } from 'react-redux';
import style from './TileRules.module.css';
import {
  selectCurrentTile,
  selectCurrentProjectId,
  selectTiles,
} from '../../redux/tiles/selector';
import Rules from './Rules/Rules';
import Button from '../custom/Button/Button';
import { generateRulesByColor } from '../../redux/tiles/slice';
import { DEFAULT_COLOR_TOLERANCE } from '../../utils/colorMatching';

const TileRules = () => {
  const dispatch = useDispatch();
  const tile = useSelector(selectCurrentTile);
  const currentProjectId = useSelector(selectCurrentProjectId);
  const tiles = useSelector(selectTiles);
  const tileList = Object.values(tiles);

  const hasAnalyzedEdges = tileList.some(item => item?.edgeColors);
  const canAutoGenerate =
    currentProjectId && tileList.length && hasAnalyzedEdges;

  const handleAutoGenerate = () => {
    if (!canAutoGenerate) return;
    dispatch(
      generateRulesByColor({
        projectId: currentProjectId,
        tolerance: DEFAULT_COLOR_TOLERANCE,
      }),
    );
  };

  return (
    <div className={style.container}>
      <div className={style.header}>
        <h4 className={style.title}>RULES</h4>
        <Button
          className={style['auto-button']}
          primary
          onClick={handleAutoGenerate}
          disabled={!canAutoGenerate}
        >
          Add rules (auto)
        </Button>
      </div>

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
