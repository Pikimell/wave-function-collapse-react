import style from './Canvas.module.css';
import { useState } from 'react';

const Canvas = ({ canvasRef, params = {} }) => {
  const canvasWidth = params.size * params.spriteSize;
  return (
    <div className={style.container}>
      <canvas
        className={style.canvas}
        ref={canvasRef}
        style={{ width: `${canvasWidth}px` }}
      ></canvas>
    </div>
  );
};

export default Canvas;
