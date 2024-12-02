import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // LocalStorage
import tilesReducer from './tiles/slice';

const persistConfig = {
  key: 'tiles',
  storage,
};

const persistedReducer = persistReducer(persistConfig, tilesReducer);

export const store = configureStore({
  reducer: {
    tiles: persistedReducer,
  },
});

export const persistor = persistStore(store);
