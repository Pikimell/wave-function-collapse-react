import { configureStore } from '@reduxjs/toolkit';
import framesReducer from './frames/slice';

export const store = configureStore({
  reducer: {
    frames: framesReducer,
  },
});
