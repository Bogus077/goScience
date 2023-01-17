export type Notification = {
  id: number;
  title: string;
  text: string;
  type: string;
  updatedAt: string;
  createdAt: string;
};

export type GetNotificationsResponse = Notification[];

export type AddNotificationsRequest = Pick<
  Notification,
  'title' | 'text' | 'type'
>;
export type AddNotificationsResponse = Notification;

export type RemoveNotificationsRequest = Pick<Notification, 'id'>;
