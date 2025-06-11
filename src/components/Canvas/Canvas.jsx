import { Flex } from 'antd';
import style from './Canvas.module.css';
import { useState } from 'react';
import Input from '../custom/Input/Input';

const validateInput = (value, min = 0, max = 100) => {
  value = Math.max(+value, min);
  value = Math.min(+value, max);
  return +value;
};
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
            setParams({
              ...params,
              size: validateInput(e.target.value, 5, 300),
            });
          }}
        />
        <input
          type="range"
          min="0.5"
          max="100"
          step="0.01"
          value={scale}
          onChange={e => setScale(validateInput(e.target.value, 0.5, 100))}
        />
        <Input
          label="Sprite Size"
          type="number"
          min="5"
          max="400"
          value={params.spriteSize}
          onChange={e => {
            setParams({
              ...params,
              spriteSize: validateInput(e.target.value, 5, 400),
            });
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
