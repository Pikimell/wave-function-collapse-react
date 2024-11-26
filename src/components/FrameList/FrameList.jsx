import { useSelector } from 'react-redux';
import style from './FrameList.module.css';
import { selectFrames } from '../../redux/frames/selector';
import UploadFrame from '../custom/UploadFrame/UploadFrame';
import FrameBlock from '../custom/FrameBlock/FrameBlock';

const FrameList = ({}) => {
  const frames = useSelector(selectFrames);

  return (
    <div className={style.container}>
      <h4 className={style.title}>FRAMES</h4>

      <ul className={style.list}>
        {frames.map(frame => {
          return (
            <li key={frame.id}>
              <FrameBlock frame={frame} />
            </li>
          );
        })}
        <UploadFrame />
      </ul>
    </div>
  );
};

export default FrameList;
