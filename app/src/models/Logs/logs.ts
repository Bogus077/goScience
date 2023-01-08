export type Log = {
  id: number;
  UserId: number;
  log: string;
  createdAt: string;
};

export type GetLogsResponse = Log[];

export type LogsFilters = {
  limit?: number;
  UserId?: number;
  log?: string;
};
