export const getTime = (date: Date) => {
  return `${date.getHours()}:${date.getMinutes()}`;
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
