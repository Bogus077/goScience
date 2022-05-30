import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './userSlice';
import { teamReducer } from './teamSlice';
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
      team: teamReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
