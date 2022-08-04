export type StatsTask = {
  id: number;
  UserId: number;
  KidId: number;
  TasksDayId: number;
  points: number;
  status: boolean & null;
  createdAt: string;
  updatedAt: string;
};

export type GetUserStatsResponse = StatsTask[];
