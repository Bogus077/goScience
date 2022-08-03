import { UserSetting } from '../User/user';

export type TaskTypes = 'day' | 'week' | 'month' | 'quarter';

export type Task = {
  id: number;
  label: string;
  description: string;
  points: number;
  date: string;
  status: boolean;
  taskgroupId: string;
  createdAt: string;
  updatedAt: string;
};

export type TaskDay = Task & {
  TasksWeekId?: number;
};

export type TaskWeek = Task & {
  TasksMonthId?: number;
};

export type TaskMonth = Task & {
  TasksQuarterId?: number;
};

export type CurrentClassTasksResponse = UserSetting;

export type ActiveTasks = {
  days: number[];
  weeks: number[];
  months: number[];
  quarter: number[];
};

export type CreateTaskRequest = {
  KidId: number[];
  label: string;
  description: string;
  status: boolean;
  date: string;
};

export type CreateTaskResponse<T> = {
  addedTasks: T[];
  errors: string[];
};

export type CreateDayTaskRequest = CreateTaskRequest & {
  TasksWeekId?: number;
  points: number;
};

export type CreateDayTaskResponse = CreateTaskResponse<TaskDay>;

export type CreateWeekTaskRequest = CreateTaskRequest & {
  TasksMonthId?: number;
};

export type CreateWeekTaskResponse = CreateTaskResponse<TaskWeek>;

export type CreateMonthTaskRequest = CreateTaskRequest & {
  TasksQuarterId?: number;
};

export type CreateMonthTaskResponse = CreateTaskResponse<TaskMonth>;

export type CreateQuarterTaskResponse = CreateTaskResponse<Task>;

export type ChangeTaskStatusRequest = {
  type: TaskTypes;
  status: boolean;
  id: number;
};

export type ChangeTaskStatusResponse = Task | TaskDay | TaskWeek | TaskMonth;

export type RemoveTaskRequest = {
  type: TaskTypes;
  id: number;
};
