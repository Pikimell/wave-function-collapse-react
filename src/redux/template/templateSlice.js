import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

export const templateSlice = createSlice({
  name: 'template',
  initialState,
  reducers: {
    setTemplate(state, { payload }) {
      state.template = payload;
    },
  },
});

export const { setTemplate } = templateSlice.actions;
export default templateSlice.reducer;
