import { Modal } from 'antd';
import style from './UploadTile.module.css';
import { FiPlus } from 'react-icons/fi';
import CropImage from '../CropImage/CropImage';
import { useModal } from '../../../hooks/useModal';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTile } from '../../../redux/tiles/slice';
import { analyzeTileEdges } from '../../../utils/colorMatching';
import { selectCurrentProjectId } from '../../../redux/tiles/selector';

const UploadTile = () => {
  const dispatch = useDispatch();
  const currentProjectId = useSelector(selectCurrentProjectId);
  const [modalIsOpen, openModal, closeModal] = useModal();
  const [image, setImage] = useState(null);

  // Відкриття вікна для вибору файлу
  const handleClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.multiple = 'true';
    input.onchange = event => {
      const fileList = event.target.files;

      if (!currentProjectId) {
        console.warn('Project is not selected. Cannot add tiles.');
        return;
      }

      if (fileList.length === 1) {
        const file = fileList[0];
        const reader = new FileReader();
        reader.onload = () => {
          setImage(reader.result);
          openModal();
        };
        reader.readAsDataURL(file);
        return;
      }

      for (const file of fileList) {
        const reader = new FileReader();
        reader.onload = () => {
          handleSave(reader.result);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  // Обробка збереження редагованого зображення
  const handleSave = async url => {
    try {
      if (!currentProjectId) {
        console.warn('Project is not selected. Cannot add tiles.');
        return;
      }

      const edgeColors = await analyzeTileEdges(url);
      dispatch(addTile({ projectId: currentProjectId, url, edgeColors }));
    } catch (error) {
      console.error('Failed to analyze tile edges', error);
      if (currentProjectId) {
        dispatch(addTile({ projectId: currentProjectId, url }));
      }
    } finally {
      closeModal();
    }
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

export default UploadTile;
