import React, { useCallback, useState } from 'react';
import {
  createFirstCalendarRow,
  fillCalendarMonth,
  isOneDate,
  MONTHS,
  WEEKDAYS,
} from '../../../utils/DateTime/DateTime';
import { IconArrow } from '../Icons/MainMenu/IconArrow';
import classNames from 'classnames/bind';
import styles from './DatePicker.module.scss';
const cx = classNames.bind(styles);

type DatePickerTypes = {
  date?: Date;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  dateFinish?: Date;
};

export const DatePicker = ({ date, dateFinish, setDate }: DatePickerTypes) => {
  const [visibleDate, setVisibleDate] = useState<Date>(date ?? new Date());

  const getDays = (date: Date) => {
    const month: Date[] = [];

    createFirstCalendarRow(date, month);
    fillCalendarMonth(month, 42);

    return month;
  };

  const isWeekend = (day: Date) => {
    return day.getDay() === 0 || day.getDay() === 6;
  };

  const isOtherMonth = (day: Date) => {
    return day.getMonth() !== visibleDate.getMonth();
  };

  const isToday = (day: Date) => isOneDate(day, new Date());

  // const isActive = (day: Date) => date && isOneDate(day, date);
  const isActive = (day: Date) =>
    date && dateFinish && day >= date && day <= dateFinish;

  const handleNextMonth = useCallback(() => {
    const newDate = new Date(visibleDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setVisibleDate(newDate);
  }, [visibleDate]);

  const handlePrevMonth = useCallback(() => {
    const newDate = new Date(visibleDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setVisibleDate(newDate);
  }, [visibleDate]);

  const handleDayClick = (date: Date) => {
    setDate(date);
  };

  return (
    <div className={styles.calendar}>
      <div className={styles.calendar__header}>
        <div className={styles.calendar__lastMonth} onClick={handlePrevMonth}>
          <IconArrow size={15} />
        </div>
        <span>{MONTHS[visibleDate.getMonth()]}</span>
        <div className={styles.calendar__nextMonth} onClick={handleNextMonth}>
          <IconArrow size={15} />
        </div>
      </div>
      <div className={styles.calendar__weekdays}>
        {WEEKDAYS.map((day, key) => (
          <span key={key}>{day}</span>
        ))}
      </div>

      <div className={styles.calendar__days}>
        {getDays(visibleDate).map((day, key) => (
          <div
            className={cx('calendar__day', {
              calendar__day_otherMonth: isOtherMonth(day),
              calendar__day_weekend: isWeekend(day),
              calendar__day_today: isToday(day),
              calendar__day_active: isActive(day),
            })}
            key={key}
            onClick={() => handleDayClick(day)}
          >
            {day.getDate()}
          </div>
        ))}
      </div>
    </div>
  );
};
