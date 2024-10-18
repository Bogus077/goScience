import type {
  BaseQueryFn,
  QueryReturnValue,
} from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import type {
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query';
import { AppState } from '../../redux/types';
import {
  getRefreshToken,
  getToken,
  logOut,
  updateAuth,
} from '../../redux/authSlice';
import { Mutex } from 'async-mutex';
import { AuthorizationResponse } from '../../models/User/auth';

export const API_URL = process.env.REACT_APP_API_URL;

export const GSBaseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  credentials: 'include',
  prepareHeaders: (headers, reduxApi) => {
    const state = reduxApi.getState() as AppState;

    let token: string | undefined;

    if (reduxApi.extra && (reduxApi.extra as { refresh: boolean }).refresh) {
      token = getRefreshToken(state);
    } else {
      token = getToken(state);
    }

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  },
});

const mutex = new Mutex();
const endpointsWithoutReAuth = ['login', 'logout', 'refresh'];

export const rosatomBaseQueryWithReAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  let result = await GSBaseQuery(args, api, extraOptions);
  if (
    result.error &&
    result.error.status === 401 &&
    endpointsWithoutReAuth.indexOf(api.endpoint) === -1
  ) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const refreshApi = {
          ...api,
          extra: {
            refresh: true,
          },
        };
        const refreshResult = (await GSBaseQuery(
          {
            url: '/auth/refresh',
          },
          refreshApi,
          extraOptions
        )) as QueryReturnValue<
          AuthorizationResponse,
          FetchBaseQueryError,
          FetchBaseQueryMeta
        >;

        if (refreshResult.data) {
          api.dispatch(updateAuth(refreshResult.data));
          result = await GSBaseQuery(args, api, extraOptions);
        } else {
          api.dispatch(logOut());
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await GSBaseQuery(args, api, extraOptions);
    }
  }

  return result;
};
