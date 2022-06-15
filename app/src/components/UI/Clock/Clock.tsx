import React, { useCallback, useState } from 'react';
import {
  getDateDayMonth,
  getTime,
  getWeekDay,
} from '../../../utils/DateTime/DateTime';
import styles from './Clock.module.scss';

export const Clock = () => {
  const date = new Date();
  const [time, setTime] = useState(getTime(date));
  const [day, setDay] = useState(getDateDayMonth(date));
  const [weekDay, setWeekDay] = useState(getWeekDay(date));

  /**
   * Функция следит за изменением времени и при необходимости обновляет часы
   */
  const updateTime = useCallback(
    (date: Date) => {
      const newTime = getTime(date);
      if (newTime !== time) {
        setTime(newTime);
      }
    },
    [time]
  );

  /**
   * Функция следит за изменением даты и при необходимости обновляет дату
   */
  const updateDay = useCallback(
    (date: Date) => {
      const newDay = getDateDayMonth(date);
      if (newDay !== day) {
        setDay(newDay);
      }
    },
    [day]
  );

  /**
   * Функция следит за изменением дня недели и при необходимости обновляет день недели
   */
  const updateWeekDay = useCallback(
    (date: Date) => {
      const newDay = getWeekDay(date);
      if (newDay !== weekDay) {
        setWeekDay(newDay);
      }
    },
    [weekDay]
  );

  setInterval(() => updateTime(new Date()), 5000);
  setInterval(() => {
    updateDay(new Date());
    updateWeekDay(new Date());
  }, 30000);

  return (
    <div className={styles.clock}>
      <div className={styles.clock__time}>{time}</div>
      <div className={styles.clock__date}>{`${day}, ${weekDay}`}</div>
    </div>
  );
};
