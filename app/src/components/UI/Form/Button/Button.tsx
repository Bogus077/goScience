import React from 'react';
import classNames from 'classnames/bind';
import styles from './Button.module.scss';
import { Loader } from '../../Loader';
const cx = classNames.bind(styles);

type ButtonTypes = {
  label: string;
  type?: 'inactive' | 'warning' | 'regular' | 'submit';
  isLoading?: boolean;
  onClick?: () => void;
};

export const Button = ({ label, type, isLoading, onClick }: ButtonTypes) => {
  return (
    <div
      className={cx('button', {
        button_inactive: type === 'inactive',
        button_warning: type === 'warning',
        button_submit: type === 'submit',
      })}
      onClick={onClick}
    >
      <div className={styles.button__label}>
        {isLoading ? <Loader /> : label}
      </div>
    </div>
  );
};
