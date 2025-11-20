import { useDispatch, useSelector } from 'react-redux';
import Canvas from '../../components/Canvas/Canvas';
import GenerateMenu from '../../components/GenerateMenu/GenerateMenu';
import { useMapGenerate } from '../../hooks/useMapGenerate';
import style from './GeneratePage.module.css';
import { useRef, useState } from 'react';
import {
  selectCurrentProjectId,
  selectProjectList,
  selectTiles,
} from '../../redux/tiles/selector';
import { selectProject } from '../../redux/tiles/slice';
import Button from '../../components/custom/Button/Button';
import { useNavigate } from 'react-router-dom';

const GeneratePage = ({}) => {
  const {
    startGenerate,
    stopGenerate,
    quickGenerate,
    isActive,
    hasResult,
    result,
    setEntropyVisualization,
    stepGenerate,
    isStepping,
  } = useMapGenerate();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const canvasRef = useRef();
  const tiles = useSelector(selectTiles);
  const projects = useSelector(selectProjectList);
  const currentProjectId = useSelector(selectCurrentProjectId);
  const [params, setParams] = useState({ size: 10, spriteSize: 50 });
  const [entropyMode, setEntropyMode] = useState('count');

  const handleStart = () => {
    const size = params.size;
    const canvas = canvasRef.current;

    if (size && canvas && tiles) {
      startGenerate({ size, canvas, tiles, entropyMode });
    }
  };
  const handleQuickStart = () => {
    const size = params.size;
    const canvas = canvasRef.current;

    if (size && canvas && tiles) {
      quickGenerate({ size, canvas, tiles, entropyMode });
    }
  };
  const handleStep = () => {
    const size = params.size;
    const canvas = canvasRef.current;

    if (size && canvas && tiles) {
      stepGenerate({ size, canvas, tiles, entropyMode });
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

  const handleProjectChange = event => {
    const projectId = event.target.value;
    if (projectId) {
      dispatch(selectProject(projectId));
    }
  };

  const handleOpenProject = () => {
    if (currentProjectId) {
      navigate(`/projects/${currentProjectId}`);
    }
  };

  const handleEntropyModeChange = event => {
    const selectedMode = event.target.value;
    setEntropyMode(selectedMode);
    const canvas = canvasRef.current;
    if (canvas) {
      setEntropyVisualization({ mode: selectedMode, canvas, tiles });
    }
  };

  const tileCount = Object.keys(tiles).length;

  return (
    <div className={style.page}>
      <div className={style['control-panel']}>
        <div className={style['project-picker']}>
          <label className={style['project-label']} htmlFor="projectSelect">
            Project
          </label>
          <select
            id="projectSelect"
            className={style['project-select']}
            value={currentProjectId || ''}
            onChange={handleProjectChange}
          >
            {projects.map(project => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
          <span className={style['project-meta']}>
            {tileCount} tile{tileCount === 1 ? '' : 's'}
          </span>
          <Button type="button" onClick={handleOpenProject}>
            Manage
          </Button>
        </div>
        <GenerateMenu
          onStart={handleStart}
          onStop={stopGenerate}
          onSaveImage={handleSaveImage}
          onSaveJSON={handleSaveJSON}
          onQuickStart={handleQuickStart}
          onStep={handleStep}
          isActive={isActive}
          isStepping={isStepping}
          hasResult={hasResult}
        />
        <label className={style['entropy-toggle']}>
          <span className={style['entropy-label']}>Entropy overlay</span>
          <select
            className={style['entropy-select']}
            value={entropyMode}
            onChange={handleEntropyModeChange}
          >
            <option value="none">Hidden</option>
            <option value="count">Numbers</option>
            <option value="heatmap">Heat map</option>
          </select>
        </label>
      </div>

      <Canvas canvasRef={canvasRef} params={params} setParams={setParams} />
    </div>
  );
};

export default GeneratePage;
