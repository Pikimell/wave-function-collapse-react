import style from './CropImage.module.css';
import { useRef } from 'react';
import AvatarEditor from 'react-avatar-editor';
import Button from '../Button/Button';

const getImageUrl = async image => {
  const dataUrl = image.toDataURL();
  const blob = await (await fetch(dataUrl)).blob();
  return URL.createObjectURL(blob);
};

const CropImage = ({ imgUrl, onSave }) => {
  const editorRef = useRef(null);
  const borderRef = useRef();

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

  const handleMouseEnter = () => {
    borderRef.current.style.display = 'none';
  };
  const handleMouseLeave = () => {
    borderRef.current.style.display = 'block';
  };

  return (
    <div className={style['crop-container']}>
      <div className={style['crop-box']}>
        <AvatarEditor
          className={style.crop}
          ref={editorRef}
          image={imgUrl}
          width={250}
          height={250}
          border={50}
          color={[255, 255, 255, 0.7]}
          scale={1.0}
          rotate={0}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
        <div className={style.box} ref={borderRef}></div>
      </div>

      <Button onClick={handleSave}>SAVE FRAME</Button>
    </div>
  );
};

export default CropImage;
