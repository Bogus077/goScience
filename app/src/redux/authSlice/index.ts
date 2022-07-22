import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { AuthorizationResponse } from '../../models/User/auth';
import { GSAPI } from '../GSApi';

export type InitialState = {
  authorization?: {
    accessToken?: string;
    refreshToken?: string;
  };
};

const initialState: InitialState = {};

const authSlice = createSlice({
  name: 'authorization',
  initialState: initialState,
  reducers: {
    updateAuth: (state, { payload }: PayloadAction<AuthorizationResponse>) => {
      state.authorization = payload;
    },
    logOut: (state) => {
      state.authorization = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      GSAPI.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.authorization = payload;
      }
    );
    builder.addMatcher(
      GSAPI.endpoints.signUp.matchFulfilled,
      (state, { payload }) => {
        state.authorization = { accessToken: payload.accessToken };
      }
    );
  },
});

export const { reducer: authReducer } = authSlice;
export const { updateAuth, logOut } = authSlice.actions;
export * from './selectors';
