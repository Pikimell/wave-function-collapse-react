import { Flex, Modal } from 'antd';
import style from './SelectFrame.module.css';
import { FiPlus } from 'react-icons/fi';
import { useModal } from '../../../hooks/useModal';
import { useSelector } from 'react-redux';
import { selectFrameList } from '../../../redux/frames/selector';
import { useMemo, useState } from 'react';
import FrameBlock from '../FrameBlock/FrameBlock';

const SelectFrame = ({ blackList = [], onSave }) => {
  const frames = useSelector(selectFrameList);
  const [modalIsOpen, openModal, closeModal] = useModal();
  const [currentFrameId, setCurrentFrameId] = useState(null);

  const whiteList = useMemo(() => {
    if (!frames) return [];
    return frames.filter(el => !blackList.includes(el.id));
  }, [frames, blackList]);

  const handleClick = () => {
    openModal();
  };

  const handleSave = () => {
    onSave(currentFrameId);
    setCurrentFrameId(null);
    closeModal();
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
        <Flex vertical gap="20px">
          <ul className={style.list}>
            {whiteList.map(frame => {
              const isActive = currentFrameId === frame.id;
              return (
                <FrameBlock
                  frame={frame}
                  key={frame.id}
                  isActive={isActive}
                  onClick={() => setCurrentFrameId(frame.id)}
                />
              );
            })}
          </ul>
          <button disabled={!currentFrameId} onClick={handleSave}>
            Add Frame
          </button>
        </Flex>
      </Modal>
    </>
  );
};

export default SelectFrame;
