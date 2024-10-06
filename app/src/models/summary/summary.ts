import { Kid } from '../Kid/kid';

export type SummaryUser = {
  id: number;
  KidId: number;
  label: string;
  dayStatus: boolean;
  weekStatus: boolean;
  type: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};

export type KidSummaryTasks = {
  id: number;
  KidId: number;
  label: string;
  points: number;
  dayStatus: boolean;
  weekStatus: boolean;
  createdAt: string;
  updatedAt: string;
};

export type KidSummaryProjectTasks = {
  id: number;
  KidId: number;
  label: string;
  points: number;
  dayStatus: boolean;
  weekStatus: boolean;
  createdAt: string;
  updatedAt: string;
};

export type KidSummaryUser = {
  id: number;
  KidId: number;
  label: string;
  dayStatus: boolean;
  weekStatus: boolean;
  type: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};

export type GetSummaryItemResponse = Kid & {
  SummaryUser: SummaryUser[];
  KidSummaryTasks: KidSummaryTasks[];
  KidSummaryProjectTasks: KidSummaryProjectTasks[];
  KidSummaryUsers: KidSummaryUser[];
};

export type GetSummaryResponse = GetSummaryItemResponse[];

export type ChangeSummaryStatusRequest = {
  KidSummaryUserId?: number;
  KidSummaryTaskId?: number;
  KidSummaryProjectTaskId?: number;
  type: 'day' | 'week';
  status: boolean;
};

export type CreateSummaryRequest = {
  KidId: number;
  label: string;
  type: 'day' | 'week';
};
