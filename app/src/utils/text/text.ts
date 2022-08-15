/**
 * Функция возвращает правильные окончания
 * @param count
 * @param case1
 * @param case2
 * @param case5
 * @returns
 */
export const getNormalEnding = (
  count: number, // count - число;
  case1: string, // case1 - окончание единицы (один сладкий рулет);
  case2: string, // case2 - окончание двойки (два сладких рулета);
  case5: string // case5 - окончание пятерки (пять сладких рулетов)
): string => {
  const number = count % 100;
  const number1 = count % 10;

  if (number > 10 && number < 20) return case5;
  if (number1 > 1 && number1 < 5) return case2;
  if (number1 === 1) return case1;
  return case5;
};
