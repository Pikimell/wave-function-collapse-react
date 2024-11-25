import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  items: [],
  selectFrame: {},
};

export const sliceFrames = createSlice({
  name: 'Frames',
  initialState,
  reducers: {
    addFrame(state, { payload: userData }) {},
    removeFrame(state, { payload: userData }) {},
    updateFrame(state, { payload: userData }) {},
    selectFrame(state, { payload: userData }) {},
  },
});

export const { addFrame, removeFrame, updateFrame, selectFrame } =
  sliceFrames.actions;
export default sliceFrames.reducer;
