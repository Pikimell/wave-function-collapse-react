import { configureStore } from '@reduxjs/toolkit';
import templateReducer from './template/templateSlice';

export const store = configureStore({
  reducer: {
    template: templateReducer,
  },
});
