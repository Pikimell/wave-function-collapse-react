import { Flex } from 'antd';
import style from './Canvas.module.css';
import { useState } from 'react';
import Input from '../custom/Input/Input';

const Canvas = ({ canvasRef, params = {}, setParams }) => {
  const canvasWidth = params.size * params.spriteSize;
  const [scale, setScale] = useState(1);
  return (
    <div className={style.container}>
      <Flex gap="10px">
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
        <input
          type="range"
          min="0.5"
          max="100"
          step="0.01"
          value={scale}
          onChange={e => setScale(+e.target.value)}
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
          width={canvasWidth}
          height={canvasWidth}
          style={{
            transform: `scale(${scale})`,
          }}
        ></canvas>
      </div>
    </div>
  );
};

export default Canvas;
