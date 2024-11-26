import style from './FrameBlock.module.css';
import { useState } from 'react';

const FrameBlock = ({ frame }) => {
  return (
    <div className={style.frame}>
      <img className={style.image} src={frame.url} alt="frame" />
    </div>
  );
};

export default FrameBlock;
