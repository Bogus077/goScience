import { Class } from '../Class/class';

export type Role = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type User = {
  id: number;
  phone: string;
  name: string;
  surname: string;
  middleName?: string;
  UserSetting: UserSetting;
  Classes: {
    id: number;
    label: string;
  }[];
  Roles: Role[];
};

export type UserSetting = {
  id: number;
  UserId: number;
  ClassId: number;
  Class: Class;
};

export type GetUserResponse = User;

export type UpdateUserClassRequest = {
  id: number;
};

export type RemoveUserRequest = {
  id: number;
};
