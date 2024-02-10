import { User } from '../User/user';
import { Member } from '../members/members';

export type Event = {
  id: number;
  title: string;
  startAddress: string;
  finishAddress: string;
  orderDate: Date;
  orderNumber: string;
  startDate: Date;
  Members: Member[];
  Users: User[];
  createdAt: string;
  updatedAt: string;
};

export type CreateEventRequest = Pick<
  Event,
  | 'title'
  | 'startDate'
  | 'startAddress'
  | 'finishAddress'
  | 'orderNumber'
  | 'orderDate'
> & { Users: number[]; Members: number[] };

export type UpdateEventRequest = CreateEventRequest & { id: number };
export type DeleteEventRequest = { id: number };

export type GetEventRequest = {
  id: number;
};
