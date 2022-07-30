import { UserSetting } from '../User/user';

export type Task = {
  id: number;
  label: string;
  description: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
};

export type TaskDay = Task & {
  TasksWeekId?: number;
  points: number;
};

export type TaskWeek = Task & {
  TasksMonthId?: number;
};

export type TaskMonth = Task & {
  TasksQuarterId?: number;
};

export type CurrentClassTasksResponse = UserSetting;
