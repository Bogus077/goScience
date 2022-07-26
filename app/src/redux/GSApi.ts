import { createApi } from '@reduxjs/toolkit/query/react';
import {
  CreateClassRequest,
  CreateClassResponse,
  GetUserClassesResponse,
} from '../models/Class/class';
import {
  CreateKidsRequest,
  CreateKidsResponse,
  RemoveKidsRequest,
  RemoveKidsResponse,
  UpdateKidsRequest,
  UpdateKidsResponse,
} from '../models/Kid/kid';
import {
  AuthorizationRequest,
  AuthorizationResponse,
  CheckPhoneRequest,
  CheckPhoneResponse,
} from '../models/User/auth';
import { SignUpRequest, SignUpResponse } from '../models/User/signUp';
import { getUserResponse } from '../models/User/user';
import { rosatomBaseQueryWithReAuth } from '../utils/api';

export const GSAPI = createApi({
  reducerPath: 'GS_REDUCER',
  baseQuery: rosatomBaseQueryWithReAuth,
  tagTypes: ['Users', 'User', 'Classes', 'Class'],
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

    createKid: build.mutation<CreateKidsResponse, CreateKidsRequest>({
      query: (params) => ({
        url: '/kid/createKids',
        method: 'post',
        body: params,
      }),
      invalidatesTags: (result, error, arg) =>
        error ? [] : [{ type: 'Class' }, 'Classes'],
    }),

    getUser: build.query<getUserResponse, unknown>({
      query: () => ({
        url: '/user/getUser',
      }),
      providesTags: (result) =>
        result ? [{ type: 'User' as const, id: result.id }] : [],
    }),

    getUsersClasses: build.query<GetUserClassesResponse, unknown>({
      query: () => ({
        url: '/class/getClasses',
      }),
      providesTags: (result) => {
        return result
          ? [
              ...result.map(({ id }) => ({
                type: 'Class' as const,
                id,
              })),
              'Classes',
            ]
          : ['Classes'];
      },
    }),

    updateKid: build.mutation<UpdateKidsResponse, UpdateKidsRequest>({
      query: (params) => ({
        url: '/kid/update',
        method: 'post',
        body: params,
      }),
      invalidatesTags: (result, error, arg) =>
        error ? [] : [{ type: 'Class', id: result?.ClassId }, 'Classes'],
    }),

    removeKid: build.mutation<RemoveKidsResponse, RemoveKidsRequest>({
      query: (params) => ({
        url: '/kid/remove',
        method: 'delete',
        body: params,
      }),
      invalidatesTags: (result, error, arg) =>
        error ? [] : [{ type: 'Class' }, 'Classes'],
    }),
  }),
});

export const {
  useLoginMutation,
  useCheckPhoneMutation,
  useSignUpMutation,
  useCreateClassMutation,
  useCreateKidMutation,
  useGetUserQuery,
  useGetUsersClassesQuery,
  useUpdateKidMutation,
  useRemoveKidMutation,
} = GSAPI;
