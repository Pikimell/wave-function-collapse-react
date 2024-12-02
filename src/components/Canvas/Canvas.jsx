import { Flex } from 'antd';
import style from './Canvas.module.css';
import { useState } from 'react';
import Input from '../custom/Input/Input';

const Canvas = ({ canvasRef, params = {}, setParams }) => {
  const canvasWidth = params.size * params.spriteSize;
  return (
    <div className={style.container}>
      <Flex>
        <Input
          label="Map Size"
          type="number"
          min="5"
          max="300"
          value={params.size}
          onChange={e => {
            setParams({ ...params, size: +e.target.value });
          }}
        />
        <Input
          label="Sprite Size"
          type="number"
          min="5"
          max="400"
          value={params.spriteSize}
          onChange={e => {
            setParams({ ...params, spriteSize: +e.target.value });
          }}
        />
      </Flex>
      <div className={style['canvas-container']}>
        <canvas
          className={style.canvas}
          ref={canvasRef}
          style={{ width: `${canvasWidth}px` }}
        ></canvas>
      </div>
    </div>
  );
};

export default Canvas;
