import style from './FrameBlock.module.css';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { selectFrame } from '../../../redux/frames/slice';
import { selectCurrentFrame } from '../../../redux/frames/selector';

const FrameBlock = ({ frame, showActive = true, onClick }) => {
  const dispatch = useDispatch();
  const currentFrame = useSelector(selectCurrentFrame);
  const isActiveFrame = showActive && currentFrame?.id === frame?.id;

  const handleClick = () => {
    if (onClick) onClick(frame);
    else dispatch(selectFrame(frame));
  };

  return (
    <div
      className={clsx(style.frame, isActiveFrame && style.active)}
      onClick={handleClick}
    >
      <img className={style.image} src={frame.url} alt="frame" />
    </div>
  );
};

export default FrameBlock;
