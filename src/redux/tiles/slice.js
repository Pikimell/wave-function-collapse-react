import { createSlice } from '@reduxjs/toolkit';
import { v4 as generateID } from 'uuid';
import {
  DEFAULT_COLOR_TOLERANCE,
  OPPOSITE_RULE_MAP,
  edgesAreCompatible,
} from '../../utils/colorMatching';

const DIRECTIONS = ['left', 'right', 'up', 'down'];

const createProject = name => ({
  id: generateID(),
  name,
  description: '',
  tiles: {},
  createdAt: Date.now(),
  updatedAt: Date.now(),
});

const defaultProject = createProject('Default Project');

const initialState = {
  projects: {
    [defaultProject.id]: defaultProject,
  },
  currentProjectId: defaultProject.id,
  currentTileId: null,
};

const normalizeRotation = value => {
  if (!Number.isFinite(value)) return 0;
  return ((value % 360) + 360) % 360;
};

const cloneRules = rules => {
  if (!rules || typeof rules !== 'object') {
    return {
      left: [],
      right: [],
      up: [],
      down: [],
    };
  }

  return {
    left: Array.isArray(rules.left) ? [...rules.left] : [],
    right: Array.isArray(rules.right) ? [...rules.right] : [],
    up: Array.isArray(rules.up) ? [...rules.up] : [],
    down: Array.isArray(rules.down) ? [...rules.down] : [],
  };
};

const createTile = ({ projectId, url, edgeColors, rotation, rules }) => ({
  id: generateID(),
  projectId,
  url,
  rules: {
    ...cloneRules(rules),
  },
  edgeColors: edgeColors || null,
  rotation: normalizeRotation(rotation),
  createdAt: Date.now(),
});

const sanitizePayload = payload =>
  typeof payload === 'object' && payload !== null ? payload : {};

export const sliceTiles = createSlice({
  name: 'Tiles',
  initialState,
  reducers: {
    addProject(state, { payload }) {
      const data = sanitizePayload(payload);
      const baseName = data?.name?.trim();
      const projectName =
        baseName || `Project ${Object.keys(state.projects).length + 1}`;
      const newProject = createProject(projectName);

      state.projects[newProject.id] = newProject;
      state.currentProjectId = newProject.id;
      state.currentTileId = null;
    },
    removeProject(state, { payload }) {
      const projectId = payload;
      if (!projectId || !state.projects[projectId]) return;

      delete state.projects[projectId];

      if (state.currentProjectId === projectId) {
        const [nextProjectId] = Object.keys(state.projects);
        state.currentProjectId = nextProjectId || null;
        state.currentTileId = null;
      }
    },
    renameProject(state, { payload }) {
      const { projectId, name } = sanitizePayload(payload);
      if (!projectId || !name?.trim()) return;
      const project = state.projects[projectId];
      if (!project) return;
      project.name = name.trim();
      project.updatedAt = Date.now();
    },
    selectProject(state, { payload }) {
      const projectId = payload;
      if (!projectId || !state.projects[projectId]) return;
      state.currentProjectId = projectId;
      state.currentTileId = null;
    },
    addTile(state, { payload }) {
      const data = sanitizePayload(payload);
      const projectId = data.projectId || state.currentProjectId;
      if (!projectId) return;
      const project = state.projects[projectId];
      if (!project) return;

      let imageUrl = typeof payload === 'string' ? payload : data.url;
      if (typeof imageUrl === 'string') {
        imageUrl = imageUrl.trim();
      }

      if (!imageUrl?.length) return;

      const tile = createTile({
        projectId,
        url: imageUrl,
        edgeColors: data.edgeColors,
        rotation: data.rotation,
      });

      project.tiles[tile.id] = tile;
      project.updatedAt = Date.now();
      state.currentProjectId = projectId;
      state.currentTileId = tile.id;
    },
    removeTile(state, { payload }) {
      const data = sanitizePayload(payload);
      const projectId = data.projectId || state.currentProjectId;
      const tileId = data.tileId || payload;
      if (!projectId || !tileId) return;

      const project = state.projects[projectId];
      if (!project || !project.tiles[tileId]) return;

      delete project.tiles[tileId];
      project.updatedAt = Date.now();

      // Clean references in other tiles' rules
      Object.values(project.tiles).forEach(tile => {
        DIRECTIONS.forEach(direction => {
          if (!Array.isArray(tile.rules[direction])) return;
          tile.rules[direction] = tile.rules[direction].filter(
            ruleId => ruleId !== tileId,
          );
        });
      });

      if (state.currentTileId === tileId) {
        state.currentTileId = null;
      }
    },
    addRule(state, { payload }) {
      const { projectId, tileId, ruleType, ruleValue } =
        sanitizePayload(payload);
      const targetProject = projectId || state.currentProjectId;
      if (!targetProject || !tileId || !ruleType || !ruleValue) return;

      const project = state.projects[targetProject];
      if (!project) return;

      const tile = project.tiles[tileId];
      const neighborTile = project.tiles[ruleValue];
      if (!tile || !neighborTile) return;

      const ruleBucket = tile.rules[ruleType];
      if (!Array.isArray(ruleBucket)) return;

      if (!ruleBucket.includes(ruleValue)) {
        ruleBucket.push(ruleValue);
      }

      const oppositeType = OPPOSITE_RULE_MAP[ruleType];

      if (oppositeType) {
        const oppositeBucket = neighborTile.rules[oppositeType];
        if (Array.isArray(oppositeBucket) && !oppositeBucket.includes(tileId)) {
          oppositeBucket.push(tileId);
        }
      }

      project.updatedAt = Date.now();
      state.currentProjectId = targetProject;
      state.currentTileId = tileId;
    },
    removeRule(state, { payload }) {
      const { projectId, tileId, ruleType, ruleId } = sanitizePayload(payload);
      const targetProject = projectId || state.currentProjectId;
      if (!targetProject || !tileId || !ruleType || !ruleId) return;

      const project = state.projects[targetProject];
      if (!project) return;

      const tile = project.tiles[tileId];
      if (!tile) return;

      const rules = tile.rules[ruleType];
      if (!Array.isArray(rules)) return;

      tile.rules[ruleType] = rules.filter(el => el !== ruleId);
      project.updatedAt = Date.now();
      state.currentTileId = tileId;
    },
    generateRulesByColor(state, { payload }) {
      const { projectId, tolerance } = sanitizePayload(payload);
      const targetProjectId = projectId || state.currentProjectId;
      if (!targetProjectId) return;

      const project = state.projects[targetProjectId];
      if (!project) return;

      const tileEntries = Object.entries(project.tiles || {});
      if (!tileEntries.length) return;

      const toleranceValue = Number.isFinite(tolerance)
        ? Math.max(0, tolerance)
        : DEFAULT_COLOR_TOLERANCE;

      const computedRules = {};

      for (const [tileId] of tileEntries) {
        computedRules[tileId] = {
          left: [],
          right: [],
          up: [],
          down: [],
        };
      }

      for (const [sourceId, sourceTile] of tileEntries) {
        for (const direction of DIRECTIONS) {
          const sourceEdge = sourceTile.edgeColors?.[direction];
          if (!sourceEdge) continue;

          const oppositeDirection = OPPOSITE_RULE_MAP[direction];
          if (!oppositeDirection) continue;

          for (const [candidateId, candidateTile] of tileEntries) {
            const candidateEdge =
              candidateTile.edgeColors?.[oppositeDirection];
            if (!candidateEdge) continue;

            if (
              edgesAreCompatible(sourceEdge, candidateEdge, toleranceValue) &&
              !computedRules[sourceId][direction].includes(candidateId)
            ) {
              computedRules[sourceId][direction].push(candidateId);
            }
          }
        }
      }

      let hasChanges = false;

      for (const [tileId, tile] of tileEntries) {
        const nextRules = computedRules[tileId];
        if (!nextRules) continue;

        for (const direction of DIRECTIONS) {
          const currentRules = Array.isArray(tile.rules[direction])
            ? tile.rules[direction]
            : [];
          const nextDirectionRules = nextRules[direction];

          const isSameLength =
            currentRules.length === nextDirectionRules.length;
          const isSameContent =
            isSameLength &&
            currentRules.every(
              (value, index) => value === nextDirectionRules[index],
            );

          if (!isSameContent) {
            tile.rules[direction] = nextDirectionRules;
            hasChanges = true;
          }
        }
      }

      if (hasChanges) {
        project.updatedAt = Date.now();
      }
    },
    selectTile(state, { payload }) {
      if (!payload) {
        state.currentTileId = null;
        return;
      }

      if (typeof payload === 'string') {
        // Assume tile id inside current project
        const projectId = state.currentProjectId;
        if (!projectId) return;
        const project = state.projects[projectId];
        if (!project?.tiles[payload]) return;
        state.currentTileId = payload;
        return;
      }

      const data = sanitizePayload(payload);
      const tileId = data.tileId || data.id;
      const projectId = data.projectId || state.currentProjectId;

      if (!tileId || !projectId) return;
      const project = state.projects[projectId];
      if (!project?.tiles[tileId]) return;
      state.currentProjectId = projectId;
      state.currentTileId = tileId;
    },
  },
});

export const {
  addProject,
  removeProject,
  renameProject,
  selectProject,
  addTile,
  removeTile,
  selectTile,
  addRule,
  removeRule,
  generateRulesByColor,
} = sliceTiles.actions;
export default sliceTiles.reducer;
