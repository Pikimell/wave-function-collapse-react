import { useDispatch, useSelector } from 'react-redux';
import style from './FrameList.module.css';
import { selectCurrentFrame, selectFrames } from '../../redux/frames/selector';
import UploadFrame from '../custom/UploadFrame/UploadFrame';
import FrameBlock from '../custom/FrameBlock/FrameBlock';
import { useEffect, useMemo } from 'react';
import { useListener } from '../../hooks/useListener';
import { removeFrame } from '../../redux/frames/slice';

const FrameList = () => {
  const currentFrame = useSelector(selectCurrentFrame);
  const frames = useSelector(selectFrames);
  const dispatch = useDispatch();

  useListener(
    {
      event: 'keydown',
      callback: e => {
        if (e.code === 'Backspace') {
          dispatch(removeFrame(currentFrame?.id));
        }
      },
    },
    [currentFrame],
  );

  const frameList = useMemo(() => {
    return Object.values(frames);
  }, [frames]);

  return (
    <div className={style.container}>
      <h4 className={style.title}>FRAMES</h4>

      <ul className={style.list}>
        {frameList.map(frame => {
          const isActiveFrame = currentFrame?.id === frame?.id;
          return (
            <li key={frame.id} className={style.frame}>
              <FrameBlock frame={frame} isActive={isActiveFrame} />
            </li>
          );
        })}
        <UploadFrame />
      </ul>
    </div>
  );
};

export default FrameList;
