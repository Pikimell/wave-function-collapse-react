import { useSelector } from 'react-redux';
import Canvas from '../../components/Canvas/Canvas';
import GenerateMenu from '../../components/GenerateMenu/GenerateMenu';
import { useMapGenerate } from '../../hooks/useMapGenerate';
import style from './GeneratePage.module.css';
import { useRef, useState } from 'react';
import { selectTiles } from '../../redux/tiles/selector';

const GeneratePage = ({}) => {
  const {
    startGenerate,
    stopGenerate,
    quickGenerate,
    isActive,
    hasResult,
    result,
  } = useMapGenerate();

  const canvasRef = useRef();
  const tiles = useSelector(selectTiles);
  const [params, setParams] = useState({ size: 10, spriteSize: 50 });

  const handleStart = () => {
    const size = params.size;
    const canvas = canvasRef.current;

    if (size && canvas && tiles) {
      startGenerate({ size, canvas, tiles });
    }
  };
  const handleQuickStart = () => {
    const size = params.size;
    const canvas = canvasRef.current;

    if (size && canvas && tiles) {
      quickGenerate({ size, canvas, tiles });
    }
  };
  const handleSaveImage = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const link = document.createElement('a');
      link.download = 'canvas-image.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    } else {
      console.error('Canvas element not found.');
    }
  };

  const handleSaveJSON = () => {
    if (result.length) {
      const jsonData = JSON.stringify(result, null, 2);
      const blob = new Blob([jsonData], { type: 'application/json' });
      const link = document.createElement('a');
      link.download = 'data.json';
      link.href = URL.createObjectURL(blob);
      link.click();
      URL.revokeObjectURL(link.href);
    } else {
      console.error('Result array is empty or undefined.');
    }
  };

  return (
    <div className={style.page}>
      <GenerateMenu
        onStart={handleStart}
        onStop={stopGenerate}
        onSaveImage={handleSaveImage}
        onSaveJSON={handleSaveJSON}
        onQuickStart={handleQuickStart}
        isActive={isActive}
        hasResult={hasResult}
      />

      <Canvas canvasRef={canvasRef} params={params} setParams={setParams} />
    </div>
  );
};

export default GeneratePage;
