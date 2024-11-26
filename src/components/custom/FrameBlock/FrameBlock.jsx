import style from './FrameBlock.module.css';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import { selectFrame } from '../../../redux/frames/slice';

const FrameBlock = ({ frame, isActive = false, onClick }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    if (onClick) onClick(frame);
    else dispatch(selectFrame(frame));
  };

  return (
    <div
      className={clsx(style.frame, isActive && style.active)}
      onClick={handleClick}
    >
      <img className={style.image} src={frame.url} alt="frame" />
    </div>
  );
};

export default FrameBlock;
