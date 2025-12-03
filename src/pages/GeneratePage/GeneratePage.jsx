import { useDispatch, useSelector } from 'react-redux';
import Canvas from '../../components/Canvas/Canvas';
import GenerateMenu from '../../components/GenerateMenu/GenerateMenu';
import { useMapGenerate } from '../../hooks/useMapGenerate';
import style from './GeneratePage.module.css';
import { useMemo, useRef, useState } from 'react';
import {
  selectCurrentProjectId,
  selectProjectList,
  selectTiles,
} from '../../redux/tiles/selector';
import { selectProject } from '../../redux/tiles/slice';
import Button from '../../components/custom/Button/Button';
import { useNavigate } from 'react-router-dom';
import { createRotatedTiles } from '../../utils/tileRotations';

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
    stats,
  } = useMapGenerate();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const canvasRef = useRef();
  const tiles = useSelector(selectTiles);
  const rotatedTiles = useMemo(() => createRotatedTiles(tiles), [tiles]);
  const projects = useSelector(selectProjectList);
  const currentProjectId = useSelector(selectCurrentProjectId);
  const [params, setParams] = useState({ size: 10, spriteSize: 50 });
  const [entropyMode, setEntropyMode] = useState('count');

  const handleStart = () => {
    const size = params.size;
    const canvas = canvasRef.current;

    if (size && canvas && rotatedTiles) {
      startGenerate({ size, canvas, tiles: rotatedTiles, entropyMode });
    }
  };
  const handleQuickStart = () => {
    const size = params.size;
    const canvas = canvasRef.current;

    if (size && canvas && rotatedTiles) {
      quickGenerate({ size, canvas, tiles: rotatedTiles, entropyMode });
    }
  };
  const handleStep = () => {
    const size = params.size;
    const canvas = canvasRef.current;

    if (size && canvas && rotatedTiles) {
      stepGenerate({ size, canvas, tiles: rotatedTiles, entropyMode });
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
      setEntropyVisualization({
        mode: selectedMode,
        canvas,
        tiles: rotatedTiles,
      });
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
        <div className={style['stats-panel']}>
          <div className={style['stats-header']}>Statistics by step</div>
          <div className={style['stats-grid']}>
            <div className={style['stat-item']}>
              <span className={style['stat-label']}>Entropy</span>
              <span className={style['stat-value']}>{stats.entropy}</span>
            </div>
            <div className={style['stat-item']}>
              <span className={style['stat-label']}>Collapsed cell</span>
              <span className={style['stat-value']}>{stats.solved}</span>
            </div>
            <div className={style['stat-item']}>
              <span className={style['stat-label']}>
                Variants for neighbors
              </span>
              <span className={style['stat-value']}>
                {stats.neighborOptions}
              </span>
            </div>
          </div>
        </div>
      </div>

      <Canvas
        canvasRef={canvasRef}
        params={params}
        setParams={setParams}
        entropyMode={entropyMode}
        onEntropyModeChange={handleEntropyModeChange}
      />
    </div>
  );
};

export default GeneratePage;
