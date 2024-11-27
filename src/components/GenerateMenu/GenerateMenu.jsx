import Button from '../custom/Button/Button';
import Input from '../custom/Input/Input';
import style from './GenerateMenu.module.css';

const GenerateMenu = ({
  onStart,
  onStop,
  onQuickStart,
  params,
  setParams,
  isActive,
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
      <Input
        label="Map Size"
        type="number"
        min="5"
        max="100"
        value={params.size}
        onChange={e => {
          setParams({ ...params, size: +e.target.value });
        }}
      />
      <Input
        label="Sprite Size"
        type="number"
        min="5"
        max="100"
        value={params.spriteSize}
        onChange={e => {
          setParams({ ...params, spriteSize: +e.target.value });
        }}
      />
    </div>
  );
};

export default GenerateMenu;
