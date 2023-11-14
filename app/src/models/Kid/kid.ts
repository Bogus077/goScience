import { StatsTask } from '../Stats/stats';
import { Task, TaskDay, TaskMonth, TaskWeek } from '../Tasks/tasks';

export type KidRow = {
  name: string;
  surname: string;
  phone?: string;
};

export type Kid = {
  id?: number;
  name: string;
  surname: string;
  phone?: string;
  ClassId?: string;
  TasksDays?: TaskDay[];
  TasksWeeks?: TaskWeek[];
  TasksMonths?: TaskMonth[];
  TasksQuarters?: Task[];
  StatsTasks?: StatsTask[];
};

/**
 * Запрос на добавление детей
 */
export type CreateKidsRequest = {
  name: string;
  surname: string;
  phone?: string;
  ClassId: number;
}[];

export type CreateKidsResponse = {
  id: number;
  name: string;
  surname: string;
  phone?: string;
  ClassId: number;
}[];

export type UpdateKidsRequest = {
  id: number;
  name: string;
  surname: string;
  phone?: string;
};

export type AddRoleToUserRequest = {
  UserId: number;
  RoleId: number;
};

export type RemoveRoleFromUserRequest = {
  UserId: number;
  RoleId: number;
};

export type UserRoleResponse = {
  id: number;
  UserId: number;
  RoleId: number;
};

export type UpdateKidsResponse = {
  id: number;
  name: string;
  surname: string;
  phone?: string;
  ClassId: number;
};

export type RemoveKidsRequest = {
  id: number;
};

export type RemoveKidsResponse = string;
