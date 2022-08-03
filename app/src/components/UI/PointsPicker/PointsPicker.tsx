import React from 'react';
import classNames from 'classnames/bind';
import styles from './PointsPicker.module.scss';
import { POINTS } from '../../../utils/points/points';
const cx = classNames.bind(styles);

type PointsPickerTypes = {
  points: number;
  setPoints: React.Dispatch<React.SetStateAction<number>>;
};

export const PointsPicker = ({ points, setPoints }: PointsPickerTypes) => {
  const handleIncr = () => {
    setPoints((prev) => prev + 1);
  };

  const handleDecr = () => {
    setPoints((prev) => (prev !== 0 ? prev - 1 : 0));
  };

  return (
    <div className={styles.points}>
      <span>Выполнение задачи займёт:</span>
      <div className={styles.points__picker}>
        <div className={styles.points__arrow} onClick={handleDecr}>
          -
        </div>
        <div
          className={cx('points__count', {
            points__count_warning:
              points > POINTS.positive && points <= POINTS.warning,
            points__count_negative: points > POINTS.warning,
          })}
        >
          <div>{points * 15}</div> минут
        </div>
        <div className={styles.points__arrow} onClick={handleIncr}>
          +
        </div>
      </div>
    </div>
  );
};
