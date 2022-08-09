export type ProjectTask = {
  id: number;
  ProjectId: number;
  label: string;
  description: string;
  date: string;
  status: boolean;
  points: number;
  isDeleted: boolean & null;
  createdAt: string;
  updatedAt: string;
};

export type Project = {
  id: number;
  TeamId: number;
  UserId: number;
  label: string;
  archived: boolean;
  isDeleted?: boolean & null;
  createdAt: string;
  updatedAt: string;
  ProjectTasks: ProjectTask[];
};
