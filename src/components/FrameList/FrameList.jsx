import SelectFrame from '../custom/SelectFrame/SelectFrame';
import style from './FrameList.module.css';

const FrameList = ({}) => {
  return (
    <div className={style.container}>
      <h4 className={style.title}>FRAMES</h4>

      <ul className={style.list}>
        <SelectFrame />
      </ul>
    </div>
  );
};

export default FrameList;
