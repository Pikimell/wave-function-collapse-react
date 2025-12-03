import { useDispatch, useSelector } from 'react-redux';
import style from './TileList.module.css';
import { selectCurrentTile, selectTiles } from '../../redux/tiles/selector';
import UploadTile from '../custom/UploadTile/UploadTile';
import TileBlock from '../custom/TileBlock/TileBlock';
import { useEffect, useMemo, useState } from 'react';
import { useListener } from '../../hooks/useListener';
import { addTile, removeTile } from '../../redux/tiles/slice';
import Button from '../custom/Button/Button';
import {
  rotateEdgeColors,
  mirrorEdgeColors,
  mirrorRules,
} from '../../utils/tileRotations';
import { rotateImage, mirrorImage } from '../../utils/imageTransform';

const TileList = () => {
  const currentTile = useSelector(selectCurrentTile);
  const tiles = useSelector(selectTiles);
  const dispatch = useDispatch();
  const [isCreatingRotations, setIsCreatingRotations] = useState(false);
  const [isCreatingMirrors, setIsCreatingMirrors] = useState(false);
  const [isRemovingDuplicates, setIsRemovingDuplicates] = useState(false);

  useListener(
    {
      event: 'keydown',
      callback: e => {
        if (e.code === 'Backspace' && currentTile?.id) {
          dispatch(
            removeTile({
              projectId: currentTile.projectId,
              tileId: currentTile.id,
            }),
          );
        }
      },
    },
    [currentTile],
  );

  const tileList = useMemo(() => {
    return Object.values(tiles);
  }, [tiles]);

  const handleCreateRotations = async () => {
    if (!tileList.length || isCreatingRotations) return;
    setIsCreatingRotations(true);
    const rotations = [90, 180, 270];

    try {
      for (const tile of tileList) {
        if (!tile?.url) continue;
        for (const rotation of rotations) {
          try {
            const rotatedUrl = await rotateImage(tile.url, rotation);
            const edgeColors = rotateEdgeColors(
              tile.edgeColors,
              Math.round(rotation / 90),
            );
            dispatch(
              addTile({
                projectId: tile.projectId,
                url: rotatedUrl,
                edgeColors,
                rotation: (tile.rotation || 0) + rotation,
              }),
            );
          } catch (error) {
            console.error('Failed to create rotated copy', {
              tileId: tile.id,
              rotation,
              error,
            });
          }
        }
      }
    } finally {
      setIsCreatingRotations(false);
    }
  };

  const handleCreateMirrors = async () => {
    if (!tileList.length || isCreatingMirrors) return;
    setIsCreatingMirrors(true);

    try {
      for (const tile of tileList) {
        if (!tile?.url) continue;
        for (const axis of ['horizontal', 'vertical']) {
          try {
            const mirroredUrl = await mirrorImage(tile.url, axis);
            const edgeColors = mirrorEdgeColors(tile.edgeColors, axis);
            const rules = mirrorRules(tile.rules, axis);
            dispatch(
              addTile({
                projectId: tile.projectId,
                url: mirroredUrl,
                edgeColors,
                rotation: tile.rotation || 0,
                rules,
              }),
            );
          } catch (error) {
            console.error('Failed to create mirrored copy', {
              tileId: tile.id,
              axis,
              error,
            });
          }
        }
      }
    } finally {
      setIsCreatingMirrors(false);
    }
  };

  const handleRemoveDuplicates = () => {
    if (!tileList.length || isRemovingDuplicates) return;
    setIsRemovingDuplicates(true);

    try {
      const urlMap = new Map();
      const duplicates = [];

      for (const tile of tileList) {
        if (!tile?.url) continue;
        if (urlMap.has(tile.url)) {
          duplicates.push(tile);
        } else {
          urlMap.set(tile.url, tile.id);
        }
      }

      duplicates.forEach(tile => {
        dispatch(
          removeTile({
            projectId: tile.projectId,
            tileId: tile.id,
          }),
        );
      });
    } finally {
      setIsRemovingDuplicates(false);
    }
  };

  return (
    <div className={style.container}>
      <h4 className={style.title}>FRAMES</h4>
      {/* <Button
        className={style['rotate-button']}
        onClick={handleCreateRotations}
        disabled={!tileList.length || isCreatingRotations}
      >
        Створити копії з обертанням
      </Button>
      <Button
        className={style['mirror-button']}
        onClick={handleCreateMirrors}
        disabled={!tileList.length || isCreatingMirrors}
      >
        Створити копії з відзеркаленням
      </Button>
      <Button
        className={style['dedupe-button']}
        onClick={handleRemoveDuplicates}
        disabled={!tileList.length || isRemovingDuplicates}
      >
        Видалити дублікати
      </Button> */}

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
