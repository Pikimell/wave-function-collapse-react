import { createSlice } from '@reduxjs/toolkit';
import { v4 as generateID } from 'uuid';
const initialState = {
  items: {},
  currentFrame: null,
};

export const sliceFrames = createSlice({
  name: 'Frames',
  initialState,
  reducers: {
    addFrame(state, { payload: imageUrl }) {
      const frame = {
        id: generateID(),
        url: imageUrl,
        rules: {
          left: [],
          right: [],
          up: [],
          down: [],
        },
      };
      state.items[frame.id] = frame;
    },
    removeFrame(state, { payload: frameId }) {
      delete state.items[frameId];
      state.currentFrame = null;
    },
    addRule(state, { payload: userData }) {
      const { frameId, ruleType, ruleValue } = userData;
      state.items[frameId].rules[ruleType].push(ruleValue);
      state.currentFrame = state.items[frameId];
    },
    removeRule(state, { payload: userData }) {
      const { frameId, ruleType, ruleId } = userData;

      state.items[frameId].rules[ruleType] = state.items[frameId].rules[
        ruleType
      ].filter(el => el !== ruleId);

      state.currentFrame = state.items[frameId];
    },
    selectFrame(state, { payload: frame }) {
      state.currentFrame = frame;
    },
    updateFrame(state, { payload: userData }) {},
  },
});

export const {
  addFrame,
  removeFrame,
  updateFrame,
  selectFrame,
  addRule,
  removeRule,
} = sliceFrames.actions;
export default sliceFrames.reducer;
