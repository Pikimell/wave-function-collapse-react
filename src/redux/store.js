import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // LocalStorage
import framesReducer from './frames/slice';

const persistConfig = {
  key: 'frames',
  storage,
};

const persistedReducer = persistReducer(persistConfig, framesReducer);

export const store = configureStore({
  reducer: {
    frames: persistedReducer,
  },
});

export const persistor = persistStore(store);
