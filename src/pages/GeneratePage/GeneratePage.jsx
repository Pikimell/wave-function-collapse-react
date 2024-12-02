import { useSelector } from 'react-redux';
import Canvas from '../../components/Canvas/Canvas';
import GenerateMenu from '../../components/GenerateMenu/GenerateMenu';
import { useMapGenerate } from '../../hooks/useMapGenerate';
import style from './GeneratePage.module.css';
import { useRef, useState } from 'react';
import { selectTiles } from '../../redux/tiles/selector';

const GeneratePage = ({}) => {
  const { startGenerate, stopGenerate, quickGenerate, isActive } =
    useMapGenerate();

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
