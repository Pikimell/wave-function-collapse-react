import { Flex } from 'antd';
import Button from '../custom/Button/Button';
import Input from '../custom/Input/Input';
import style from './GenerateMenu.module.css';

const GenerateMenu = ({
  onStart,
  onStop,
  onSaveImage,
  onSaveJSON,
  onQuickStart,
  isActive,
  hasResult = false,
}) => {
  return (
    <div className={style.container}>
      <Button onClick={onStart} disabled={isActive}>
        Start Generate
      </Button>
      <Button onClick={onQuickStart} disabled={isActive}>
        Quick Generate
      </Button>
      <Button onClick={onStop} disabled={!isActive}>
        Stop Generate
      </Button>
      <Button onClick={onSaveImage} disabled={!hasResult}>
        Save Image
      </Button>
      <Button onClick={onSaveJSON} disabled={!hasResult}>
        Save JSON
      </Button>
    </div>
  );
};

export default GenerateMenu;
