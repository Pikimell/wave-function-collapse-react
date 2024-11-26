import { useSelector } from 'react-redux';
import style from './FrameList.module.css';
import { selectFrames } from '../../redux/frames/selector';
import UploadFrame from '../custom/UploadFrame/UploadFrame';
import FrameBlock from '../custom/FrameBlock/FrameBlock';
import { useMemo } from 'react';

const FrameList = () => {
  const frames = useSelector(selectFrames);
  const frameList = useMemo(() => {
    return Object.values(frames);
  }, [frames]);

  return (
    <div className={style.container}>
      <h4 className={style.title}>FRAMES</h4>

      <ul className={style.list}>
        {frameList.map(frame => {
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
