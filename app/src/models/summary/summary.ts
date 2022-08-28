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

export type GetSummaryResponse = (Kid & {
  SummaryUser: SummaryUser[];
  KidSummaryTasks: KidSummaryTasks[];
  KidSummaryProjectTasks: KidSummaryProjectTasks[];
})[];
