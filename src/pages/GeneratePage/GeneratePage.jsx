import { useSelector } from 'react-redux';
import Canvas from '../../components/Canvas/Canvas';
import GenerateMenu from '../../components/GenerateMenu/GenerateMenu';
import { useMapGenerate } from '../../hooks/useMapGenerate';
import style from './GeneratePage.module.css';
import { useRef, useState } from 'react';
import { selectFrames } from '../../redux/frames/selector';

const GeneratePage = ({}) => {
  const { startGenerate, stopGenerate, quickGenerate, isActive } =
    useMapGenerate();

  const canvasRef = useRef();
  const frames = useSelector(selectFrames);
  const [params, setParams] = useState({ size: 10, spriteSize: 50 });

  const handleStart = () => {
    const size = params.size;
    const canvas = canvasRef.current;

    if (size && canvas && frames) {
      startGenerate({ size, canvas, frames });
    }
  };
  const handleQuickStart = () => {
    const size = params.size;
    const canvas = canvasRef.current;

    if (size && canvas && frames) {
      quickGenerate({ size, canvas, frames });
    }
  };

  return (
    <div className={style.page}>
      <GenerateMenu
        onStart={handleStart}
        onStop={stopGenerate}
        onQuickStart={handleQuickStart}
        params={params}
        setParams={setParams}
        isActive={isActive}
      />

      <Canvas canvasRef={canvasRef} params={params} />
    </div>
  );
};

export default GeneratePage;
