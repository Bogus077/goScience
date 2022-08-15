import React from 'react';
import classNames from 'classnames/bind';
import styles from './Badge.module.scss';
const cx = classNames.bind(styles);

type BadgeTypes = {
  type: 'positive' | 'disable';
  text: string;
};

export const Badge = ({ type, text }: BadgeTypes) => {
  return (
    <div
      className={cx('badge', {
        badge_disable: type === 'disable',
      })}
    >
      {text}
    </div>
  );
};
