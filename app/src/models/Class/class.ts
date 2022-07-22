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
