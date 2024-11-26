import { Modal } from 'antd';
import style from './SelectFrame.module.css';
import { FiPlus } from 'react-icons/fi';
import CropImage from '../CropImage/CropImage';
import { useModal } from '../../../hooks/useModal';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addFrame } from '../../../redux/frames/slice';

const SelectFrame = () => {
  const dispatch = useDispatch();
  const [modalIsOpen, openModal, closeModal] = useModal();
  const [image, setImage] = useState(null);

  // Відкриття вікна для вибору файлу
  const handleClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = event => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setImage(reader.result); // Встановлюємо URL вибраного файлу
          openModal();
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  // Обробка збереження редагованого зображення
  const handleSave = async url => {
    dispatch(addFrame(url));
    closeModal();
  };

  return (
    <>
      <div className={style.box} onClick={handleClick}>
        <FiPlus className={style.icon} />
      </div>
      <Modal open={modalIsOpen} onCancel={closeModal} footer={null}>
        {image && <CropImage imgUrl={image} onSave={handleSave} />}
      </Modal>
    </>
  );
};

export default SelectFrame;
