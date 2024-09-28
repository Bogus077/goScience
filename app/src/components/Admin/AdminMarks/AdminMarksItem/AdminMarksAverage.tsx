import React from 'react';
import styles from './AdminMarksItem.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

type AdminMarksAverageTypes = {
  average?: string | number;
};

export const AdminMarksAverage = ({ average }: AdminMarksAverageTypes) => {
  const averageNumber =
    typeof average === 'number' ? average : average ? parseFloat(average) : NaN;
  const value = isNaN(averageNumber) ? '-' : Math.round(average as number);
  return (
    <div
      className={cx('mark', {
        mark_5: value === 5,
        mark_4: value === 4,
        mark_3: value === 3,
        mark_2: value === 2,
      })}
    >
      {average}
    </div>
  );
};
