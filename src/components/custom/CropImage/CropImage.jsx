import style from './CropImage.module.css';
import { useRef, useState } from 'react';
import AvatarEditor from 'react-avatar-editor';

const getImageUrl = async image => {
  const dataUrl = image.toDataURL();
  const blob = await (await fetch(dataUrl)).blob();
  return URL.createObjectURL(blob);
};

const CropImage = ({ imgUrl, onSave }) => {
  const editorRef = useRef(null);

  const handleSave = async () => {
    if (editorRef.current) {
      try {
        const image = editorRef.current.getImage();
        const url = await getImageUrl(image);
        onSave(url);
      } catch (error) {
        console.error('Error generating image URL:', error);
      }
    }
  };

  return (
    <div className={style['crop-box']}>
      <AvatarEditor
        ref={editorRef}
        image={imgUrl}
        width={250}
        height={250}
        border={50}
        color={[255, 255, 255, 0.5]} // Колір рамки
        scale={1.0}
        rotate={0}
      />
      <button onClick={handleSave}>SAVE FRAME</button>
    </div>
  );
};

export default CropImage;
