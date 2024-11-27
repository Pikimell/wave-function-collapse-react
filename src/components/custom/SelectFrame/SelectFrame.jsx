import { Flex, Modal } from 'antd';
import style from './SelectFrame.module.css';
import { FiPlus } from 'react-icons/fi';
import { useModal } from '../../../hooks/useModal';
import { useSelector } from 'react-redux';
import { selectFrameList } from '../../../redux/frames/selector';
import { useMemo, useState } from 'react';
import FrameBlock from '../FrameBlock/FrameBlock';

const SelectFrame = ({ blackList = [], onSave, multiply = true }) => {
  const frames = useSelector(selectFrameList);
  const [modalIsOpen, openModal, closeModal] = useModal();
  const [currentFrameIds, setCurrentFrameIds] = useState([]);

  const whiteList = useMemo(() => {
    if (!frames) return [];
    return frames.filter(el => !blackList.includes(el.id));
  }, [frames, blackList]);

  const handleClick = () => {
    openModal();
  };

  const handleSave = e => {
    e.preventDefault();

    if (!currentFrameIds.length) return;
    onSave(currentFrameIds);
    setCurrentFrameIds([]);
    closeModal();
  };

  const toggleItem = frameId => {
    if (!multiply) {
      setCurrentFrameIds([frameId]);
    } else {
      if (currentFrameIds.includes(frameId)) {
        const copy = currentFrameIds.filter(el => el != frameId);
        setCurrentFrameIds(copy);
      } else {
        setCurrentFrameIds([...currentFrameIds, frameId]);
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
            {whiteList.map(frame => {
              const isActive = currentFrameIds.includes(frame.id);
              return (
                <FrameBlock
                  frame={frame}
                  key={frame.id}
                  isActive={isActive}
                  onClick={() => toggleItem(frame.id)}
                />
              );
            })}
          </ul>
          <button type="submit" disabled={!currentFrameIds.length}>
            Add Frame
          </button>
        </form>
      </Modal>
    </>
  );
};

export default SelectFrame;
