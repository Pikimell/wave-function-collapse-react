export const selectProjectState = state => state.tiles;

export const selectProjects = state => selectProjectState(state).projects;

export const selectProjectList = state =>
  Object.values(selectProjects(state) || {});

export const selectProjectById = (state, projectId) =>
  selectProjects(state)?.[projectId] || null;

export const selectCurrentProjectId = state =>
  selectProjectState(state).currentProjectId;

export const selectCurrentProject = state =>
  selectProjectById(state, selectCurrentProjectId(state));

export const selectTiles = state => selectCurrentProject(state)?.tiles || {};

export const selectProjectTiles = (state, projectId) =>
  selectProjectById(state, projectId)?.tiles || {};

export const selectTileList = state => Object.values(selectTiles(state));

export const selectTileListByProject = (state, projectId) =>
  Object.values(selectProjectTiles(state, projectId));

export const selectCurrentTileId = state =>
  selectProjectState(state).currentTileId;

export const selectCurrentTile = state =>
  selectTiles(state)[selectCurrentTileId(state)] || null;
