import React from 'react';
import classNames from 'classnames/bind';
import styles from './Indicator.module.scss';
import { POINTS } from '../../../utils/points/points';
const cx = classNames.bind(styles);

type IndicatorTypes = {
  text: string;
  color?: 'yellow' | 'red';
  points: number;
};

export const Indicator = ({ text, color, points }: IndicatorTypes) => {
  return (
    <div
      className={cx('ind', {
        ind_yellow: points > POINTS.positive && points <= POINTS.warning,
        ind_red: points > POINTS.warning && points !== 0,
        ind_disable: points === 0,
      })}
    >
      {text.slice(0, 1)}
    </div>
  );
};
