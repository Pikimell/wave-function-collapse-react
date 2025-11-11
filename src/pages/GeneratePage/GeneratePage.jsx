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
  } = useMapGenerate();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const canvasRef = useRef();
  const tiles = useSelector(selectTiles);
  const projects = useSelector(selectProjectList);
  const currentProjectId = useSelector(selectCurrentProjectId);
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
          isActive={isActive}
          hasResult={hasResult}
        />
      </div>

      <Canvas canvasRef={canvasRef} params={params} setParams={setParams} />
    </div>
  );
};

export default GeneratePage;
