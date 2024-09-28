import React from 'react';
import styles from './AdminMarksItem.module.scss';
import classNames from 'classnames/bind';
import Tooltip from '@mui/material/Tooltip';
import isSameDay from 'date-fns/isSameDay';
const cx = classNames.bind(styles);

type AdminMarksItemTypes = {
  mark: {
    mark: string | number;
    month: string;
    date: string;
  };
  description?: string;
};

export const months: { [key: string]: string } = {
  Январь: '01',
  Февраль: '02',
  Март: '03',
  Апрель: '04',
  Май: '05',
  Июнь: '06',
  Июль: '07',
  Август: '08',
  Сентябрь: '09',
  Октябрь: '10',
  Ноябрь: '11',
  Декабрь: '12',
};

export const AdminMarksItem = ({ mark, description }: AdminMarksItemTypes) => {
  const today = new Date();
  const yesterday = new Date(new Date().setDate(today.getDate() - 1));
  const month = months[mark.month as string];
  const date = new Date(`${today.getFullYear()}-${month}-${mark.date}`);
  const isToday = isSameDay(today, date);
  const isYesterday = isSameDay(yesterday, date);

  return (
    <Tooltip title={description ?? `${mark.month} - ${mark.date}`}>
      <div
        className={cx('mark', {
          mark_5: mark.mark === 5,
          mark_4: mark.mark === 4,
          mark_3: mark.mark === 3,
          mark_2: mark.mark === 2,
          // mark_today: isToday,
        })}
      >
        {isToday && <div className={styles.date}>Сегодня</div>}
        {isYesterday && <div className={styles.date}>Вчера</div>}
        {mark.mark}
      </div>
    </Tooltip>
  );
};
