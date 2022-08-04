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
import { GetUserStatsResponse } from '../models/Stats/stats';
import {
  ChangeTaskStatusRequest,
  ChangeTaskStatusResponse,
  CreateDayTaskRequest,
  CreateDayTaskResponse,
  CreateMonthTaskRequest,
  CreateMonthTaskResponse,
  CreateQuarterTaskResponse,
  CreateTaskRequest,
  CreateWeekTaskRequest,
  CreateWeekTaskResponse,
  CurrentClassTasksResponse,
  RemoveTaskRequest,
} from '../models/Tasks/tasks';
import {
  AuthorizationRequest,
  AuthorizationResponse,
  CheckPhoneRequest,
  CheckPhoneResponse,
} from '../models/User/auth';
import { SignUpRequest, SignUpResponse } from '../models/User/signUp';
import { GetUserResponse, UpdateUserClassRequest } from '../models/User/user';
import { rosatomBaseQueryWithReAuth } from '../utils/api';

export const GSAPI = createApi({
  reducerPath: 'GS_REDUCER',
  baseQuery: rosatomBaseQueryWithReAuth,
  tagTypes: [
    'Users',
    'User',
    'Classes',
    'Class',
    'Kids',
    'Kid',
    'TaskStat',
    'TaskStats',
  ],
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

    getUser: build.query<GetUserResponse, unknown>({
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

    changeUserClass: build.mutation<unknown, UpdateUserClassRequest>({
      query: (params) => ({
        url: '/class/change',
        method: 'post',
        body: params,
      }),
      invalidatesTags: (result, error, arg) =>
        error ? [] : [{ type: 'User' }],
    }),

    getCurrentClass: build.query<CurrentClassTasksResponse, unknown>({
      query: () => ({
        url: '/class/get',
      }),
      providesTags: (result) =>
        result
          ? [
              { type: 'Class' as const, id: result.id },
              ...result.Class.Kids.map(({ id }) => ({
                type: 'Kid' as const,
                id,
              })),
              'Kids',
              'Classes',
            ]
          : [],
    }),

    createDayTask: build.mutation<CreateDayTaskResponse, CreateDayTaskRequest>({
      query: (params) => ({
        url: '/tasks/createDayTask',
        method: 'post',
        body: params,
      }),
      invalidatesTags: (result, error, arg) =>
        error ? [] : [{ type: 'Class' }, 'Classes'],
    }),

    createWeekTask: build.mutation<
      CreateWeekTaskResponse,
      CreateWeekTaskRequest
    >({
      query: (params) => ({
        url: '/tasks/createWeekTask',
        method: 'post',
        body: params,
      }),
      invalidatesTags: (result, error, arg) =>
        error ? [] : [{ type: 'Class' }, 'Classes'],
    }),

    createMonthTask: build.mutation<
      CreateMonthTaskResponse,
      CreateMonthTaskRequest
    >({
      query: (params) => ({
        url: '/tasks/createMonthTask',
        method: 'post',
        body: params,
      }),
      invalidatesTags: (result, error, arg) =>
        error ? [] : [{ type: 'Class' }, 'Classes'],
    }),

    createQuarterTask: build.mutation<
      CreateQuarterTaskResponse,
      CreateTaskRequest
    >({
      query: (params) => ({
        url: '/tasks/createQuarterTask',
        method: 'post',
        body: params,
      }),
      invalidatesTags: (result, error, arg) =>
        error ? [] : [{ type: 'Class' }, 'Classes'],
    }),

    changeTaskStatus: build.mutation<
      ChangeTaskStatusResponse,
      ChangeTaskStatusRequest
    >({
      query: (params) => ({
        url: '/tasks/status',
        method: 'post',
        body: params,
      }),
      invalidatesTags: (result, error, arg) =>
        error ? [] : [{ type: 'Class' }, 'Classes', 'TaskStats'],
    }),

    removeTask: build.mutation<unknown, RemoveTaskRequest>({
      query: (params) => ({
        url: '/tasks/remove',
        method: 'delete',
        body: params,
      }),
      invalidatesTags: (result, error, arg) =>
        error ? [] : [{ type: 'Class' }, 'Classes'],
    }),

    getUserStats: build.query<GetUserStatsResponse, unknown>({
      query: () => ({
        url: '/stats/get',
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: 'TaskStat' as const,
                id,
              })),
              'TaskStats',
            ]
          : [],
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
  useChangeUserClassMutation,
  useGetCurrentClassQuery,
  useCreateDayTaskMutation,
  useCreateWeekTaskMutation,
  useCreateMonthTaskMutation,
  useCreateQuarterTaskMutation,
  useChangeTaskStatusMutation,
  useRemoveTaskMutation,
  useGetUserStatsQuery,
} = GSAPI;
