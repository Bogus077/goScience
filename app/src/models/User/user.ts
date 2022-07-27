import { Class } from '../Class/class';

export type User = {
  id: number;
  phone: string;
  name: string;
  surname: string;
  UserSetting?: UserSetting;
  Classes: {
    id: number;
    label: string;
  }[];
};

export type UserSetting = {
  id: number;
  UserId: number;
  ClassId: number;
  Class?: Class;
};

export type GetUserResponse = User;

export type UpdateUserClassRequest = {
  id: number;
};
