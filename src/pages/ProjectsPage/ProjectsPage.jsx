import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/custom/Button/Button';
import {
  addProject,
  removeProject,
  renameProject,
  selectProject,
} from '../../redux/tiles/slice';
import {
  selectCurrentProjectId,
  selectProjectList,
} from '../../redux/tiles/selector';
import style from './ProjectsPage.module.css';

const ProjectsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const projects = useSelector(selectProjectList);
  const currentProjectId = useSelector(selectCurrentProjectId);
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [draftName, setDraftName] = useState('');

  const isRenameMode = projectId => editingProjectId === projectId;

  const handleCreateProject = () => {
    dispatch(addProject());
  };

  const handleOpenProject = projectId => {
    dispatch(selectProject(projectId));
    navigate(`/projects/${projectId}`);
  };

  const handleStartRename = project => {
    setEditingProjectId(project.id);
    setDraftName(project.name);
  };

  const handleCancelRename = () => {
    setEditingProjectId(null);
    setDraftName('');
  };

  const handleRenameSubmit = event => {
    event.preventDefault();
    if (!draftName.trim() || !editingProjectId) return;
    dispatch(
      renameProject({ projectId: editingProjectId, name: draftName.trim() }),
    );
    handleCancelRename();
  };

  const handleDeleteProject = project => {
    if (!project) return;
    if (projects.length <= 1) return;

    const shouldRemove =
      typeof window !== 'undefined'
        ? window.confirm(
            `Видалити проєкт "${project.name}"? Це видалить усі його тайли.`,
          )
        : true;

    if (shouldRemove) {
      dispatch(removeProject(project.id));
    }
  };

  const projectCards = useMemo(() => projects || [], [projects]);

  return (
    <section className={style.page}>
      <div className={style.header}>
        <h2 className={style.title}>Projects</h2>
        <Button primary onClick={handleCreateProject}>
          Create Project
        </Button>
      </div>

      {!projectCards.length && (
        <p className={style.empty}>
          Створіть перший проєкт, щоб налаштувати власні тайли та правила.
        </p>
      )}

      <ul className={style.list}>
        {projectCards.map(project => {
          const tileCount = Object.keys(project.tiles || {}).length;
          const isActive = currentProjectId === project.id;
          const renameMode = isRenameMode(project.id);

          return (
            <li
              key={project.id}
              className={`${style.card} ${isActive ? style.active : ''}`}
            >
              {renameMode ? (
                <form className={style['rename-form']} onSubmit={handleRenameSubmit}>
                  <input
                    className={style['rename-input']}
                    value={draftName}
                    onChange={event => setDraftName(event.target.value)}
                    placeholder="Project name"
                    autoFocus
                  />
                  <div className={style['rename-actions']}>
                    <Button type="submit" primary>
                      Save
                    </Button>
                    <Button type="button" onClick={handleCancelRename}>
                      Cancel
                    </Button>
                  </div>
                </form>
              ) : (
                <>
                  <div className={style['card-header']}>
                    <h3 className={style.name}>{project.name}</h3>
                    {isActive && <span className={style.badge}>Active</span>}
                  </div>
                  <p className={style.meta}>
                    {tileCount} tile{tileCount === 1 ? '' : 's'}
                  </p>
                  <div className={style.actions}>
                    <Button
                      primary
                      onClick={() => handleOpenProject(project.id)}
                    >
                      Open
                    </Button>
                    <Button onClick={() => handleStartRename(project)}>
                      Rename
                    </Button>
                    <Button
                      onClick={() => handleDeleteProject(project)}
                      disabled={projects.length <= 1}
                    >
                      Delete
                    </Button>
                  </div>
                </>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default ProjectsPage;
