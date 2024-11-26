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
    updateFrame(state, { payload: userData }) {},
    selectFrame(state, { payload: frame }) {
      state.currentFrame = frame;
    },
  },
});

export const { addFrame, removeFrame, updateFrame, selectFrame } =
  sliceFrames.actions;
export default sliceFrames.reducer;
