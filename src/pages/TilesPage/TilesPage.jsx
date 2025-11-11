import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../components/custom/Button/Button';
import TileList from '../../components/TileList/TileList';
import TilePreview from '../../components/TilePreview/TilePreview';
import TileRules from '../../components/TileRules/TileRules';
import {
  selectCurrentProjectId,
  selectProjectById,
} from '../../redux/tiles/selector';
import { selectProject } from '../../redux/tiles/slice';
import style from './TilesPage.module.css';

const TilesPage = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentProjectId = useSelector(selectCurrentProjectId);
  const project = useSelector(state => selectProjectById(state, projectId));

  useEffect(() => {
    if (!projectId) {
      navigate('/projects', { replace: true });
      return;
    }
    if (project && currentProjectId !== projectId) {
      dispatch(selectProject(projectId));
    }
  }, [projectId, project, currentProjectId, dispatch, navigate]);

  if (!project) {
    return (
      <section className={style.page}>
        <div className={style.placeholder}>
          <h2 className={style.title}>Project not found</h2>
          <p className={style.subtitle}>
            Оберіть дійсний проєкт зі списку, щоб налаштувати тайли та правила.
          </p>
          <Button onClick={() => navigate('/projects')}>Back to Projects</Button>
        </div>
      </section>
    );
  }

  const tileCount = Object.keys(project.tiles || {}).length;

  return (
    <section className={style.page}>
      <div className={style.header}>
        <div>
          <h2 className={style.title}>{project.name}</h2>
          <p className={style.subtitle}>
            {tileCount} tile{tileCount === 1 ? '' : 's'} configured
          </p>
        </div>
        <Button onClick={() => navigate('/projects')}>All Projects</Button>
      </div>
      <div className={style['base-container']}>
        <TileList />
        <TileRules />
      </div>

      <TilePreview />
    </section>
  );
};

export default TilesPage;
