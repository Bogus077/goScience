import { createStore } from './store';
import type { Action, ThunkAction } from '@reduxjs/toolkit';

type AppStore = ReturnType<typeof createStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<R = void> = ThunkAction<
  R,
  AppState,
  unknown,
  Action<string>
>;
