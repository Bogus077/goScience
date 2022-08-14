import { Kid } from '../Kid/kid';
import { Project } from '../Project/Project';

export type Team = {
  id: number;
  label: string;
  UserId: number;
  createdAt: string;
  updatedAt: string;
  Kids: Kid[];
  Projects: Project[];
};

export type GetUserTeamsResponse = Team[];

export type CreateTeamRequest = {
  label: string;
  kids: number[];
};

export type CreateTeamResponse = {
  id: number;
  label: string;
  UserId: number;
  createdAt: string;
  updatedAt: string;
};

export type UpdateTeamRequest = {
  label: string;
  kids: number[];
};

export type UpdateTeamResponse = {
  id: number;
  label: string;
  UserId: number;
  createdAt: string;
  updatedAt: string;
};
