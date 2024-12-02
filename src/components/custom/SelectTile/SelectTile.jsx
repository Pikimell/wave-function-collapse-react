import { Flex, Modal } from 'antd';
import style from './SelectTile.module.css';
import { FiPlus } from 'react-icons/fi';
import { useModal } from '../../../hooks/useModal';
import { useSelector } from 'react-redux';
import { selectTileList } from '../../../redux/tiles/selector';
import { useMemo, useState } from 'react';
import TileBlock from '../TileBlock/TileBlock';
import Button from '../Button/Button';

const SelectTile = ({ blackList = [], onSave, multiply = true }) => {
  const tiles = useSelector(selectTileList);
  const [modalIsOpen, openModal, closeModal] = useModal();
  const [currentTileIds, setCurrentTileIds] = useState([]);

  const whiteList = useMemo(() => {
    if (!tiles) return [];
    return tiles.filter(el => !blackList.includes(el.id));
  }, [tiles, blackList]);

  const handleClick = () => {
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
        classNames={style.modal}
        open={modalIsOpen}
        onCancel={closeModal}
        footer={null}
      >
        <form className={style.form} onSubmit={handleSave}>
          <ul className={style.list}>
            {whiteList.map(tile => {
              const isActive = currentTileIds.includes(tile.id);
              return (
                <TileBlock
                  tile={tile}
                  key={tile.id}
                  isActive={isActive}
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
