import { createApi } from '@reduxjs/toolkit/query/react';
import { CreateClassRequest, CreateClassResponse } from '../models/Class/class';
import {
  AuthorizationRequest,
  AuthorizationResponse,
  CheckPhoneRequest,
  CheckPhoneResponse,
} from '../models/User/auth';
import { SignUpRequest, SignUpResponse } from '../models/User/signUp';
import { rosatomBaseQueryWithReAuth } from '../utils/api';

export const GSAPI = createApi({
  reducerPath: 'GS_REDUCER',
  baseQuery: rosatomBaseQueryWithReAuth,
  tagTypes: ['Users', 'User'],
  keepUnusedDataFor: 30,
  endpoints: (build) => ({
    login: build.mutation<AuthorizationResponse, AuthorizationRequest>({
      query: (credentials) => ({
        url: '/user/signIn',
        method: 'post',
        body: credentials,
      }),
    }),

    checkPhone: build.mutation<CheckPhoneResponse, CheckPhoneRequest>({
      query: (params) => ({
        url: '/user/checkPhone',
        method: 'post',
        body: params,
      }),
    }),

    signUp: build.mutation<SignUpResponse, SignUpRequest>({
      query: (params) => ({
        url: '/user/signUp',
        method: 'post',
        body: params,
      }),
    }),

    createClass: build.mutation<CreateClassResponse, CreateClassRequest>({
      query: (params) => ({
        url: '/class/createClass',
        method: 'post',
        body: params,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useCheckPhoneMutation,
  useSignUpMutation,
  useCreateClassMutation,
} = GSAPI;
