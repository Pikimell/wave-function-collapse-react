import { createSlice } from '@reduxjs/toolkit';
import { v4 as generateID } from 'uuid';
const initialState = {
  items: {},
  currentTile: null,
};

export const sliceTiles = createSlice({
  name: 'Tiles',
  initialState,
  reducers: {
    addTile(state, { payload: imageUrl }) {
      const tile = {
        id: generateID(),
        url: imageUrl,
        rules: {
          left: [],
          right: [],
          up: [],
          down: [],
        },
      };
      state.items[tile.id] = tile;
    },
    removeTile(state, { payload: tileId }) {
      delete state.items[tileId];
      state.currentTile = null;
    },
    addRule(state, { payload: userData }) {
      const { tileId, ruleType, ruleValue } = userData;
      state.items[tileId].rules[ruleType].push(ruleValue);
      state.currentTile = state.items[tileId];
    },
    removeRule(state, { payload: userData }) {
      const { tileId, ruleType, ruleId } = userData;

      state.items[tileId].rules[ruleType] = state.items[tileId].rules[
        ruleType
      ].filter(el => el !== ruleId);

      state.currentTile = state.items[tileId];
    },
    selectTile(state, { payload: tile }) {
      state.currentTile = tile;
    },
    updateTile(state, { payload: userData }) {},
  },
});

export const {
  addTile,
  removeTile,
  updateTile,
  selectTile,
  addRule,
  removeRule,
} = sliceTiles.actions;
export default sliceTiles.reducer;
