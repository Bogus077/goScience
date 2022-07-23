import { Kid } from '../Kid/kid';

/**
 * Запрос на создание класса
 */
export type CreateClassRequest = {
  label: string;
  userId: number;
};

export type CreateClassResponse = {
  label: string;
  id: number;
};

export type Class = {
  id: number;
  label: string;
  Kids: Kid[];
};

export type GetUserClassesResponse = Class[];
