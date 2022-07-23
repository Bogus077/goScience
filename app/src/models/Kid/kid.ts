export type Kid = {
  name: string;
  surname: string;
  phone?: string;
};

/**
 * Запрос на добавление детей
 */
export type CreateKidsRequest = {
  name: string;
  surname: string;
  phone?: string;
  ClassId: number;
}[];

export type CreateKidsResponse = {
  id: number;
  name: string;
  surname: string;
  phone?: string;
  ClassId: number;
}[];
