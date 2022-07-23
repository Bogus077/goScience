export type Task = {
  id: number;
  lable: string;
  description: string;
  date: string;
  points: number;
  status: boolean;
  TaskgroupId: number;
  createdAt: string;
  updatedAt: string;
};

export type Taskgroup = {
  id: number;
  KidId: number;
  createdAt: string;
  updatedAt: string;
  TasksDays: Task[];
  TasksWeeks: Task[];
  TasksQuarters: Task[];
};
