import { AppState } from '../types';
import { createDraftSafeSelector } from '@reduxjs/toolkit';

const selectSelf = (state: AppState) => state.user;

export const isAuthorized = createDraftSafeSelector(selectSelf, (store) =>
  // Boolean(store.user?.accessToken)
  Boolean(1)
);
