import style from './CropImage.module.css';
import { useRef, useState } from 'react';
import AvatarEditor from 'react-avatar-editor';
import Button from '../Button/Button';
import { Input, Slider } from 'antd';

const getImageUrl = async image => {
  const dataUrl = image.toDataURL();
  const blob = await (await fetch(dataUrl)).blob();
  return URL.createObjectURL(blob);
};

const CropImage = ({ imgUrl, onSave }) => {
  const editorRef = useRef(null);
  const borderRef = useRef();
  const [scale, setScale] = useState(1);

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
  const handleChangeScale = value => {
    setScale(value);
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
          scale={scale}
          rotate={0}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
        <div className={style.box} ref={borderRef}></div>
      </div>

      <Slider
        defaultValue={1}
        value={scale}
        onChange={handleChangeScale}
        min={1}
        max={10}
        step={0.01}
      />

      <Button onClick={handleSave}>SAVE FRAME</Button>
    </div>
  );
};

export default CropImage;
