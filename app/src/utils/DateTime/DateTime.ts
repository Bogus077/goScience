export const getTime = (date: Date) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${hours > 9 ? hours : `0${hours}`}:${
    minutes > 9 ? minutes : `0${minutes}`
  }`;
};

export const getDateDayMonth = (date: Date) => {
  const month = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря',
  ];
  return `${date.getDate()} ${month[date.getMonth()]}`;
};

export const getWeekDay = (date: Date) => {
  const week = [
    'воскресенье',
    'понедельник',
    'вторник',
    'среда',
    'четверг',
    'пятница',
    'суббота',
  ];
  return `${week[date.getDay()]}`;
};

export const WEEKDAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
export const MONTHS = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
];

/**
 * Функция создает первую строку календаря
 * @param date
 * @param month
 */
export const createFirstCalendarRow = (date: Date, month: Date[]) => {
  const monthFirstDay = new Date(date);
  monthFirstDay.setDate(1);

  // Ищем ближайший понедельник
  if (monthFirstDay.getDay() > 1) {
    monthFirstDay.setDate(
      monthFirstDay.getDate() - (monthFirstDay.getDay() - 1)
    );
  } else if (monthFirstDay.getDay() === 0) {
    monthFirstDay.setDate(monthFirstDay.getDate() - 6);
  }

  //Заполняем массив датами первой недели
  const day = monthFirstDay;
  for (let days = 0; days < 7; days++) {
    const nextDay = new Date(day);
    month.push(nextDay);
    day.setDate(day.getDate() + 1);
  }
};

/**
 * Функция заполняет массив с датами, формируя месяц
 * @param month
 * @param daysCount
 */
export const fillCalendarMonth = (month: Date[], daysCount: number) => {
  const day = new Date(month[month.length - 1]);
  for (let days = month.length; days < daysCount; days++) {
    day.setDate(day.getDate() + 1);
    const nextDay = new Date(day);
    month.push(nextDay);
  }
};

/**
 * Функция сравнивает две даты и возвращает true, если речь идёт об одном дне
 * @param firstDate
 * @param secondDate
 * @returns
 */
export const isOneDate = (firstDate: Date, secondDate: Date) => {
  return (
    firstDate.getFullYear() === secondDate.getFullYear() &&
    firstDate.getMonth() === secondDate.getMonth() &&
    firstDate.getDate() === secondDate.getDate()
  );
};
