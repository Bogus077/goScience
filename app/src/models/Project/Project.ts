import { Kid } from '../Kid/kid';

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
  Kids: Kid[];
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

export type GetUserProjectsResponse = Project[];

export type CreateProjectRequest = {
  label: string;
  TeamId: number;
};

export type CreateProjectResponse = {
  id: number;
  TeamId: number;
  UserId: number;
  label: string;
  archived: boolean;
  isDeleted?: boolean & null;
  createdAt: string;
  updatedAt: string;
};

export type UpdateProjectRequest = {
  label: string;
  TeamId: number;
  ProjectId: number;
};

export type UpdateProjectResponse = CreateProjectRequest;

export type CreateProjectTaskRequest = {
  label: string;
  description: string;
  date: string;
  points: number;
  ProjectId: number;
  kids: number[];
};

export type CreateProjectTaskResponse = ProjectTask;

export type UpdateProjectTaskRequest = {
  label: string;
  description: string;
  date: string;
  points: number;
  ProjectId: number;
  kids: number[];
  ProjectTaskId: number;
  status?: boolean;
};

export type UpdateProjectTaskResponse = ProjectTask;

export type GetProjectTaskRequest = {
  ProjectTaskId: string;
};

export type GetProjectTaskResponse = ProjectTask & { Kids: Kid[] };

export type ArchiveProjectRequest = {
  ProjectId: number;
};

export type ArchiveProjectResponse = Project;

export type RemoveProjectTaskRequest = {
  ProjectTaskId: number;
};

export type RemoveProjectTaskResponse = ProjectTask;

export type DoneProjectTaskRequest = {
  ProjectTaskId: number;
};

export type DoneProjectTaskResponse = ProjectTask;
