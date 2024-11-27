import { useSelector } from 'react-redux';
import style from './FramePreview.module.css';
import { useEffect, useState } from 'react';
import { selectCurrentFrame, selectFrames } from '../../redux/frames/selector';
import FrameBlock from '../custom/FrameBlock/FrameBlock';
import { Flex } from 'antd';

const FramePreview = () => {
  const frames = useSelector(selectFrames);
  const currentFrame = useSelector(selectCurrentFrame);

  const [frameList, setFrameList] = useState({
    up: null,
    left: null,
    right: null,
    down: null,
  });

  useEffect(() => {
    if (!currentFrame?.url) return;

    let i = 0;
    const rules = currentFrame.rules;
    const intervalId = setInterval(() => {
      const newLeft = rules.left[i % rules.left.length];
      const newRight = rules.right[i % rules.right.length];
      const newUp = rules.up[i % rules.up.length];
      const newDown = rules.down[i % rules.down.length];

      setFrameList({
        up: frames[newUp],
        down: frames[newDown],
        left: frames[newLeft],
        right: frames[newRight],
      });

      i += 1;
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [frames, currentFrame]);

  if (!currentFrame?.url) return <div className={style.container}></div>;

  return (
    <div className={style.container}>
      <div>
        <FrameBlock className={style.frame} frame={frameList.up} />
      </div>

      <Flex align="center" gap="5px">
        <FrameBlock className={style.frame} frame={frameList.left} />
        <FrameBlock className={style.frame} frame={currentFrame} />
        <FrameBlock className={style.frame} frame={frameList.right} />
      </Flex>

      <div>
        <FrameBlock className={style.frame} frame={frameList.down} />
      </div>
    </div>
  );
};

export default FramePreview;
