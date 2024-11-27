import style from './Canvas.module.css';
import { useState } from 'react';

const Canvas = ({ canvasRef }) => {
  return (
    <div className={style.container}>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default Canvas;
