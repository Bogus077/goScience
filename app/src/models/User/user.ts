import { Class } from '../Class/class';

export type User = {
  id: number;
  phone: string;
  name: string;
  surname: string;
  UserSetting?: UserSetting;
};

export type UserSetting = {
  id: number;
  UserId: number;
  ClassId: number;
  Class?: Class;
};

export type getUserResponse = User;
