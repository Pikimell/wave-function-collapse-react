import style from './FrameBlock.module.css';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import { selectFrame } from '../../../redux/frames/slice';

const FrameBlock = ({
  className = '',
  frame,
  isActive = false,
  onClick,
  ...props
}) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    if (onClick) onClick(frame);
    else dispatch(selectFrame(frame));
  };

  return (
    <div
      className={clsx(style.frame, isActive && style.active, className)}
      onClick={handleClick}
      {...props}
    >
      {frame?.url && (
        <img className={style.image} src={frame.url} alt="frame" />
      )}
    </div>
  );
};

export default FrameBlock;
