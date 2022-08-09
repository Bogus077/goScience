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
