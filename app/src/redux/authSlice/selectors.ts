import { AppState } from '../types';
import { createDraftSafeSelector } from '@reduxjs/toolkit';

const selectSelf = (state: AppState) => state.authorization;

export const isAuthorized = createDraftSafeSelector(selectSelf, (store) =>
  Boolean(store.authorization?.accessToken)
);

export const getToken = createDraftSafeSelector(
  selectSelf,
  (store) => store.authorization?.accessToken
);

export const getRefreshToken = createDraftSafeSelector(
  selectSelf,
  (store) => store.authorization?.refreshToken
);
