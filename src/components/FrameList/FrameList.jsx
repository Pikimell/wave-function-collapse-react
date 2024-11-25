import style from './FrameList.module.css';
import { useState } from 'react';

const FrameList = ({}) => {
  return (
    <div className={style.container}>
      <h4 className={style.title}>FRAMES</h4>

      <ul className={style.list}></ul>
    </div>
  );
};

export default FrameList;
