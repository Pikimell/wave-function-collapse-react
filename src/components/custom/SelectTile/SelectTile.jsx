import { Modal, Switch } from 'antd';
import style from './SelectTile.module.css';
import { FiPlus } from 'react-icons/fi';
import { useModal } from '../../../hooks/useModal';
import { useSelector } from 'react-redux';
import { selectTileList } from '../../../redux/tiles/selector';
import { useEffect, useMemo, useState } from 'react';
import TileBlock from '../TileBlock/TileBlock';
import Button from '../Button/Button';
import {
  DEFAULT_COLOR_TOLERANCE,
  edgesAreCompatible,
  OPPOSITE_RULE_MAP,
} from '../../../utils/colorMatching';

const SelectTile = ({
  blackList = [],
  onSave,
  multiply = true,
  ruleType,
  referenceTile,
}) => {
  const tiles = useSelector(selectTileList);
  const [modalIsOpen, openModal, closeModal] = useModal();
  const [currentTileIds, setCurrentTileIds] = useState([]);
  const [showOnlySuggested, setShowOnlySuggested] = useState(true);

  const whiteList = useMemo(() => {
    if (!tiles) return [];
    return tiles.filter(el => !blackList.includes(el.id));
  }, [tiles, blackList]);

  const suggestionInfo = useMemo(() => {
    if (!referenceTile || !ruleType) {
      return { suggestedIds: new Set(), count: 0 };
    }

    const sourceEdge = referenceTile.edgeColors?.[ruleType];
    const oppositeType = OPPOSITE_RULE_MAP[ruleType];

    if (!sourceEdge || !oppositeType) {
      return { suggestedIds: new Set(), count: 0 };
    }

    const suggestedTiles = whiteList.filter(tile => {
      const candidateEdge = tile.edgeColors?.[oppositeType];
      if (!candidateEdge) return false;
      return edgesAreCompatible(
        sourceEdge,
        candidateEdge,
        DEFAULT_COLOR_TOLERANCE,
      );
    });

    const suggestedIds = new Set(suggestedTiles.map(tile => tile.id));
    return { suggestedIds, count: suggestedTiles.length };
  }, [referenceTile, ruleType, whiteList]);

  const hasSuggestions = suggestionInfo.count > 0;

  useEffect(() => {
    if (!hasSuggestions && showOnlySuggested) {
      setShowOnlySuggested(false);
    }
  }, [hasSuggestions, showOnlySuggested]);

  const tilesForDisplay = useMemo(() => {
    const set = suggestionInfo.suggestedIds;
    const base =
      showOnlySuggested && set.size
        ? whiteList.filter(tile => set.has(tile.id))
        : whiteList;

    return [...base].sort((a, b) => {
      const aSuggested = set.has(a.id);
      const bSuggested = set.has(b.id);
      if (aSuggested === bSuggested) return 0;
      return aSuggested ? -1 : 1;
    });
  }, [whiteList, suggestionInfo, showOnlySuggested]);

  const handleClick = () => {
    setShowOnlySuggested(true);
    openModal();
  };

  const handleSave = e => {
    e.preventDefault();

    if (!currentTileIds.length) return;
    onSave(currentTileIds);
    setCurrentTileIds([]);
    closeModal();
  };

  const toggleItem = tileId => {
    if (!multiply) {
      setCurrentTileIds([tileId]);
    } else {
      if (currentTileIds.includes(tileId)) {
        const copy = currentTileIds.filter(el => el != tileId);
        setCurrentTileIds(copy);
      } else {
        setCurrentTileIds([...currentTileIds, tileId]);
      }
    }
  };
  return (
    <>
      <div className={style.box} onClick={handleClick}>
        <FiPlus className={style.icon} />
      </div>
      <Modal
        className={style.modal}
        open={modalIsOpen}
        onCancel={closeModal}
        footer={null}
      >
        <form className={style.form} onSubmit={handleSave}>
          <div className={style['toggle-row']}>
            <span className={style['toggle-label']}>Show recommended only</span>
            <Switch
              size="small"
              checked={hasSuggestions && showOnlySuggested}
              disabled={!hasSuggestions}
              onChange={checked => setShowOnlySuggested(checked)}
            />
          </div>
          {!hasSuggestions && (
            <p className={style.hint}>
              There are no automatic recommendations for this direction.
            </p>
          )}
          <ul className={style.list}>
            {tilesForDisplay.map(tile => {
              const isActive = currentTileIds.includes(tile.id);
              return (
                <TileBlock
                  tile={tile}
                  key={tile.id}
                  isActive={isActive}
                  isSuggested={suggestionInfo.suggestedIds.has(tile.id)}
                  onClick={() => toggleItem(tile.id)}
                />
              );
            })}
          </ul>
          <Button type="submit" disabled={!currentTileIds.length}>
            Add Tile
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default SelectTile;
