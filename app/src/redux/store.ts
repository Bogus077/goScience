import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './userSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const persistUserConfig = {
  key: 'KKUser',
  storage,
  whitelist: ['authorization', 'user'],
};

const persistedUserReducer = persistReducer(persistUserConfig, userReducer);

export const createStore = () =>
  configureStore({
    reducer: {
      user: persistedUserReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
