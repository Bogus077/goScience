import {
  AddTeacherRequest,
  AddTeachersResponse,
  ChangeTeacherPasswordRequest,
  ClearTeacherPasswordRequest,
  EditTeacherRequest,
  EditTeacherResponse,
  GetTeachersResponse,
  RemoveTeacherRequest,
} from './../models/Teacher/teacher';
import { createApi } from '@reduxjs/toolkit/query/react';
import {
  GetAttendanceRequest,
  GetAttendanceResponse,
} from '../models/Attendance/attendance';
import {
  CreateClassRequest,
  CreateClassResponse,
  GetUserClassesResponse,
} from '../models/Class/class';
import {
  AddRoleToUserRequest,
  CreateKidsRequest,
  CreateKidsResponse,
  RemoveKidsRequest,
  RemoveKidsResponse,
  RemoveRoleFromUserRequest,
  UpdateKidsRequest,
  UpdateKidsResponse,
  UserRoleResponse,
} from '../models/Kid/kid';
import { GetLogsResponse, LogsFilters } from '../models/Logs/logs';
import {
  AddMemberRequest,
  AddMemberResponse,
  EditMemberRequest,
  EditMemberResponse,
  GetMembersResponse,
  RemoveMemberRequest,
} from '../models/members/members';
import {
  AddNotificationsRequest,
  AddNotificationsResponse,
  GetNotificationsResponse,
  RemoveNotificationsRequest,
} from '../models/Notifications/Notifications';
import {
  ArchiveProjectRequest,
  ArchiveProjectResponse,
  CreateProjectRequest,
  CreateProjectResponse,
  CreateProjectTaskRequest,
  CreateProjectTaskResponse,
  DoneProjectTaskRequest,
  DoneProjectTaskResponse,
  GetProjectTaskRequest,
  GetProjectTaskResponse,
  GetUserProjectsResponse,
  RemoveProjectTaskRequest,
  RemoveProjectTaskResponse,
  UpdateProjectRequest,
  UpdateProjectResponse,
  UpdateProjectTaskRequest,
  UpdateProjectTaskResponse,
} from '../models/Project/Project';
import { GetUserStatsResponse } from '../models/Stats/stats';
import {
  ChangeSummaryStatusRequest,
  CreateSummaryRequest,
  GetSummaryItemResponse,
  GetSummaryResponse,
} from '../models/summary/summary';
import {
  AddDayToTaskRequest,
  AddDayToTaskResponse,
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
  CreateTeamRequest,
  CreateTeamResponse,
  GetUserTeamsResponse,
  UpdateTeamRequest,
  UpdateTeamResponse,
} from '../models/Teams/teams';
import {
  AuthorizationRequest,
  AuthorizationResponse,
  CheckPhoneRequest,
  CheckPhoneResponse,
} from '../models/User/auth';
import { SignUpRequest, SignUpResponse } from '../models/User/signUp';
import {
  GetUserResponse,
  RemoveUserRequest,
  UpdateUserClassRequest,
} from '../models/User/user';
import { rosatomBaseQueryWithReAuth } from '../utils/api';
import {
  CreateEventRequest,
  DeleteEventRequest,
  Event,
  GetEventRequest,
  UpdateEventRequest,
} from '../models/Event/event';
import {
  DownloadMarksResponse,
  UploadMarksFileRequest,
  UploadMarksFileResponse,
  UploadMarksTxtRequest,
  UploadMarksTxtResponse,
} from '../models/Marks/marks';
import {
  GetDefaultHelperResponse,
  GetHelpWithTasksRequest,
} from '../models/Helper/helprer';

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
    'Team',
    'Teams',
    'Project',
    'Projects',
    'ProjectTask',
    'ProjectTasks',
    'KidSummary',
    'KidsSummary',
    'Member',
    'Members',
    'Log',
    'Logs',
    'Notification',
    'Notifications',
    'Attendance',
    'AttendanceList',
    'Teacher',
    'Teachers',
    'Event',
    'Events',
    'AddressList',
    'kidMarks',
    'assistant',
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

    removeUser: build.mutation<unknown, RemoveUserRequest>({
      query: (params) => ({
        url: '/user/delete',
        method: 'delete',
        body: params,
      }),
      invalidatesTags: (result, error, arg) =>
        error ? [] : [{ type: 'User' }, 'Users'],
    }),

    getUsers: build.query<GetUserResponse[], unknown>({
      query: () => ({
        url: '/user/getUsers',
      }),
      providesTags: (result) => (result ? [{ type: 'User' }, 'Users'] : []),
    }),

    addRoleToUser: build.mutation<UserRoleResponse, AddRoleToUserRequest>({
      query: (params) => ({
        url: '/user/addRoleToUser',
        method: 'post',
        body: params,
      }),
      invalidatesTags: (result, error, arg) =>
        error ? [] : [{ type: 'User' }, 'Users'],
    }),

    removeRoleFromUser: build.mutation<
      UserRoleResponse,
      RemoveRoleFromUserRequest
    >({
      query: (params) => ({
        url: '/user/removeRoleFromUser',
        method: 'post',
        body: params,
      }),
      invalidatesTags: (result, error, arg) =>
        error ? [] : [{ type: 'User' }, 'Users'],
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

    addDayToTask: build.mutation<AddDayToTaskResponse, AddDayToTaskRequest>({
      query: (params) => ({
        url: '/tasks/addDay',
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

    uploadMarks: build.mutation<
      UploadMarksFileResponse,
      UploadMarksFileRequest
    >({
      query: ({ formData }) => ({
        url: '/marks/upload',
        method: 'post',
        body: formData,
      }),
    }),

    uploadMarksTxt: build.mutation<
      UploadMarksTxtResponse,
      UploadMarksTxtRequest
    >({
      query: ({ marks }) => ({
        url: '/marks/uploadTxt',
        method: 'post',
        body: marks,
      }),
    }),

    getMarks: build.query<DownloadMarksResponse, void>({
      query: () => ({
        url: '/marks/download',
        resposeType: 'string',
      }),
      // providesTags: (result) =>
      //   result
      //     ? [
      //         ...result.marks.map(({ kid }) => ({
      //           type: 'kidMarks' as const,
      //           kid,
      //         })),
      //         'kidMarks',
      //       ]
      //     : [],
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

    getUserTeams: build.query<GetUserTeamsResponse, unknown>({
      query: () => ({
        url: '/team/get',
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: 'Team' as const,
                id,
              })),
              'Teams',
            ]
          : [],
    }),

    createTeam: build.mutation<CreateTeamResponse, CreateTeamRequest>({
      query: (params) => ({
        url: '/team/create',
        method: 'post',
        body: params,
      }),
      invalidatesTags: (result, error, arg) =>
        error ? [] : [{ type: 'Team' }, 'Teams'],
    }),

    updateTeam: build.mutation<UpdateTeamResponse, UpdateTeamRequest>({
      query: (params) => ({
        url: '/team/update',
        method: 'post',
        body: params,
      }),
      invalidatesTags: (result, error, arg) =>
        error ? [] : [{ type: 'Team' }, 'Teams'],
    }),

    getUserProjects: build.query<GetUserProjectsResponse, unknown>({
      query: () => ({
        url: '/project/get',
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: 'Project' as const,
                id,
              })),
              'Projects',
            ]
          : [],
    }),

    createProject: build.mutation<CreateProjectResponse, CreateProjectRequest>({
      query: (params) => ({
        url: '/project/create',
        method: 'post',
        body: params,
      }),
      invalidatesTags: (result, error, arg) =>
        error ? [] : [{ type: 'Project' }, 'Projects'],
    }),

    updateProject: build.mutation<UpdateProjectResponse, UpdateProjectRequest>({
      query: (params) => ({
        url: '/project/update',
        method: 'post',
        body: params,
      }),
      invalidatesTags: (result, error, arg) =>
        error ? [] : [{ type: 'Project' }, 'Projects'],
    }),

    archiveProject: build.mutation<
      ArchiveProjectResponse,
      ArchiveProjectRequest
    >({
      query: (params) => ({
        url: '/project/archive',
        method: 'post',
        body: params,
      }),
      invalidatesTags: (result, error, arg) =>
        error ? [] : [{ type: 'Project' }, 'Projects'],
    }),

    removeProject: build.mutation<
      ArchiveProjectResponse,
      ArchiveProjectRequest
    >({
      query: (params) => ({
        url: '/project/remove',
        method: 'delete',
        body: params,
      }),
      invalidatesTags: (result, error, arg) =>
        error ? [] : [{ type: 'Project' }, 'Projects'],
    }),

    createProjectTask: build.mutation<
      CreateProjectTaskResponse,
      CreateProjectTaskRequest
    >({
      query: (params) => ({
        url: '/project/createTask',
        method: 'post',
        body: params,
      }),
      invalidatesTags: (result, error, arg) =>
        error ? [] : [{ type: 'Project' }, 'Projects'],
    }),

    updateProjectTask: build.mutation<
      UpdateProjectTaskResponse,
      UpdateProjectTaskRequest
    >({
      query: (params) => ({
        url: '/project/updateTask',
        method: 'post',
        body: params,
      }),
      invalidatesTags: (result, error, arg) =>
        error
          ? []
          : [
              { type: 'Project' },
              { type: 'ProjectTask' },
              'Projects',
              'ProjectTasks',
            ],
    }),

    removeProjectTask: build.mutation<
      RemoveProjectTaskResponse,
      RemoveProjectTaskRequest
    >({
      query: (params) => ({
        url: '/project/removeTask',
        method: 'delete',
        body: params,
      }),
      invalidatesTags: (result, error, arg) =>
        error
          ? []
          : [
              { type: 'Project' },
              { type: 'ProjectTask' },
              'Projects',
              'ProjectTasks',
            ],
    }),

    doneProjectTask: build.mutation<
      DoneProjectTaskResponse,
      DoneProjectTaskRequest
    >({
      query: (params) => ({
        url: '/project/doneTask',
        method: 'post',
        body: params,
      }),
      invalidatesTags: (result, error, arg) =>
        error
          ? []
          : [
              { type: 'Project' },
              { type: 'ProjectTask' },
              'Projects',
              'ProjectTasks',
              'Teams',
            ],
    }),

    getProjectTask: build.query<GetProjectTaskResponse, GetProjectTaskRequest>({
      query: (params) => ({
        url: '/project/getProjectTask',
        method: 'post',
        body: params,
      }),
      providesTags: (result) => (result ? ['ProjectTask'] : []),
    }),

    //Summary
    getSummary: build.query<GetSummaryResponse, unknown>({
      query: () => ({
        url: '/summary/get',
      }),
      providesTags: (result) => {
        return result
          ? [
              ...result.map(({ id }) => ({
                type: 'KidSummary' as const,
                id,
              })),
              'KidsSummary',
            ]
          : ['KidsSummary'];
      },
    }),

    changeSummaryStatus: build.mutation<
      GetSummaryItemResponse,
      ChangeSummaryStatusRequest
    >({
      query: (params) => ({
        url: '/summary/status',
        method: 'post',
        body: params,
      }),
      invalidatesTags: (result, error, arg) =>
        error ? [] : [{ type: 'KidsSummary' }, 'KidsSummary'],
    }),

    createSummary: build.mutation<GetSummaryItemResponse, CreateSummaryRequest>(
      {
        query: (params) => ({
          url: '/summary/create',
          method: 'post',
          body: params,
        }),
        invalidatesTags: (result, error, arg) =>
          error ? [] : [{ type: 'KidsSummary' }, 'KidsSummary'],
      }
    ),

    //Members
    getMembers: build.query<GetMembersResponse, unknown>({
      query: () => ({
        url: '/members/get',
      }),
      providesTags: (result) => {
        return result
          ? [
              ...result.map(({ id }) => ({
                type: 'Member' as const,
                id,
              })),
              'Members',
            ]
          : ['Members'];
      },
    }),

    addMember: build.mutation<AddMemberResponse, AddMemberRequest>({
      query: (params) => ({
        url: '/members/add',
        method: 'post',
        body: params,
      }),
      invalidatesTags: (result, error, arg) =>
        error ? [] : [{ type: 'Member' }, 'Members'],
    }),

    removeMember: build.mutation<unknown, RemoveMemberRequest>({
      query: (params) => ({
        url: '/members/remove',
        method: 'post',
        body: params,
      }),
      invalidatesTags: (result, error, arg) =>
        error ? [] : [{ type: 'Member' }, 'Members'],
    }),

    editMember: build.mutation<EditMemberResponse, EditMemberRequest>({
      query: (params) => ({
        url: '/members/edit',
        method: 'post',
        body: params,
      }),
      invalidatesTags: (result, error, arg) =>
        error ? [] : [{ type: 'Member' }, 'Members'],
    }),

    //Logs
    getLogs: build.query<GetLogsResponse, LogsFilters>({
      query: (params) => ({
        url: '/members/logs',
        params,
      }),
      providesTags: (result) => {
        return result
          ? [
              ...result.map(({ id }) => ({
                type: 'Log' as const,
                id,
              })),
              'Logs',
            ]
          : ['Logs'];
      },
    }),

    //Notifications
    getNotifications: build.query<GetNotificationsResponse, unknown>({
      query: () => ({
        url: '/notifications/get',
      }),
      providesTags: (result) => {
        return result
          ? [
              ...result.map(({ id }) => ({
                type: 'Notification' as const,
                id,
              })),
              'Notifications',
            ]
          : ['Notifications'];
      },
    }),

    addNotification: build.mutation<
      AddNotificationsResponse,
      AddNotificationsRequest
    >({
      query: (params) => ({
        url: '/notifications/add',
        method: 'post',
        body: params,
      }),
      invalidatesTags: (result, error, arg) =>
        error ? [] : [{ type: 'Notification' }, 'Notifications'],
    }),

    removeNotification: build.mutation<unknown, RemoveNotificationsRequest>({
      query: (params) => ({
        url: '/notifications/remove',
        method: 'delete',
        body: params,
      }),
      invalidatesTags: (result, error, arg) =>
        error ? [] : [{ type: 'Notification' }, 'Notifications'],
    }),

    //Attendance
    getAttendance: build.query<GetAttendanceResponse, GetAttendanceRequest>({
      query: (params) => ({
        url: '/members/attendance',
        params,
      }),
      providesTags: (result) => {
        return result
          ? [
              ...result.map(({ id }) => ({
                type: 'Attendance' as const,
                id,
              })),
              'AttendanceList',
            ]
          : ['AttendanceList'];
      },
    }),

    //Teachers
    getTeachers: build.query<GetTeachersResponse, unknown>({
      query: () => ({
        url: '/teacher/get',
      }),
      providesTags: (result) => {
        return result
          ? [
              ...result.map(({ id }) => ({
                type: 'Teacher' as const,
                id,
              })),
              'Teachers',
            ]
          : ['Teachers'];
      },
    }),

    removeTeacher: build.mutation<unknown, RemoveTeacherRequest>({
      query: (params) => ({
        url: '/teacher/delete',
        method: 'delete',
        body: params,
      }),
      invalidatesTags: (result, error, arg) =>
        error ? [] : [{ type: 'Teacher' }, 'Teachers'],
    }),

    addTeacher: build.mutation<AddTeachersResponse, AddTeacherRequest>({
      query: (params) => ({
        url: '/teacher/add',
        method: 'post',
        body: params,
      }),
      invalidatesTags: (result, error, arg) =>
        error ? [] : [{ type: 'Teacher' }, 'Teachers'],
    }),

    editTeacher: build.mutation<EditTeacherResponse, EditTeacherRequest>({
      query: (body) => ({
        url: '/user/update',
        method: 'post',
        body,
      }),
      invalidatesTags: (result, error, arg) =>
        error ? [] : [{ type: 'User' }, 'Users'],
    }),

    updateTeacherPassword: build.mutation<
      { result: string },
      ChangeTeacherPasswordRequest
    >({
      query: (params) => ({
        url: '/user/changePassword',
        method: 'post',
        body: params,
      }),
    }),

    clearTeacherPassword: build.mutation<
      { result: string },
      ClearTeacherPasswordRequest
    >({
      query: (params) => ({
        url: '/user/clearPassword',
        method: 'post',
        body: params,
      }),
    }),

    createEvent: build.mutation<Event, CreateEventRequest>({
      query: (body) => ({
        url: '/event/add',
        method: 'post',
        body,
      }),
      invalidatesTags: (result, error, arg) =>
        error ? [] : [{ type: 'Event' }, 'Events'],
    }),

    updateEvent: build.mutation<Event, UpdateEventRequest>({
      query: (body) => ({
        url: '/event/update',
        method: 'post',
        body,
      }),
      invalidatesTags: (result, error, arg) =>
        error ? [] : [{ type: 'Event' }, 'Events'],
    }),

    deleteEvent: build.mutation<Event, DeleteEventRequest>({
      query: (body) => ({
        url: '/event/remove',
        method: 'delete',
        body,
      }),
      invalidatesTags: (result, error, arg) =>
        error ? [] : [{ type: 'Event' }, 'Events'],
    }),

    getEvents: build.query<Event[], void>({
      query: () => ({
        url: '/event/get',
      }),
      providesTags: (result) => {
        return result
          ? [
              ...result.map(({ id }) => ({
                type: 'Event' as const,
                id,
              })),
              'Events',
            ]
          : ['Events'];
      },
    }),

    getEvent: build.query<Event, GetEventRequest>({
      query: (params) => ({
        url: '/event/getOne',
        params,
      }),
      providesTags: (result) => (result ? ['Event'] : []),
    }),

    getAddressList: build.query<string[], void>({
      query: () => ({
        url: '/event/address',
      }),
      providesTags: (result) => (result ? ['AddressList'] : []),
    }),

    getHelpAdvice: build.query<GetDefaultHelperResponse, void>({
      query: () => ({
        url: '/helper/help',
      }),
      // providesTags: (result) => (result ? ['AddressList'] : []),
    }),

    getHelpAdviceWithTasks: build.mutation<
      GetDefaultHelperResponse,
      GetHelpWithTasksRequest
    >({
      query: (body) => ({
        url: '/helper/tasks',
        method: 'post',
        body,
      }),
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
  useGetUsersQuery,
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
  useAddDayToTaskMutation,
  useRemoveTaskMutation,
  useGetUserStatsQuery,
  useGetUserTeamsQuery,
  useCreateTeamMutation,
  useUpdateTeamMutation,
  useGetUserProjectsQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useCreateProjectTaskMutation,
  useUpdateProjectTaskMutation,
  useGetProjectTaskQuery,
  useArchiveProjectMutation,
  useRemoveProjectMutation,
  useRemoveProjectTaskMutation,
  useDoneProjectTaskMutation,
  useGetSummaryQuery,
  useChangeSummaryStatusMutation,
  useCreateSummaryMutation,
  useGetMembersQuery,
  useAddMemberMutation,
  useRemoveMemberMutation,
  useEditMemberMutation,
  useGetLogsQuery,
  useGetNotificationsQuery,
  useAddNotificationMutation,
  useRemoveNotificationMutation,
  useGetAttendanceQuery,
  useGetTeachersQuery,
  useRemoveTeacherMutation,
  useAddTeacherMutation,
  useEditTeacherMutation,
  useAddRoleToUserMutation,
  useRemoveRoleFromUserMutation,
  useUpdateTeacherPasswordMutation,
  useClearTeacherPasswordMutation,
  useRemoveUserMutation,
  useCreateEventMutation,
  useGetEventsQuery,
  useGetEventQuery,
  useUpdateEventMutation,
  useDeleteEventMutation,
  useGetAddressListQuery,
  useGetHelpAdviceQuery,
  useLazyGetHelpAdviceQuery,
  useUploadMarksMutation,
  useUploadMarksTxtMutation,
  useGetMarksQuery,
  useGetHelpAdviceWithTasksMutation,
} = GSAPI;
