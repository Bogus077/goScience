import React, { ReactElement, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Tip.module.scss';
const cx = classNames.bind(styles);

type Props = {
  side?: 'top' | 'left' | 'bottom' | 'right';
  children: ReactElement;
};

export const Tip = ({ side = 'top', children }: Props) => {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className={styles.tip__wrapper}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      <div
        className={cx('tip', {
          tip_visible: visible,
          tip_top: side === 'top',
          tip_right: side === 'right',
          tip_left: side === 'left',
          tip_bottom: side === 'bottom',
        })}
      >
        {children}
      </div>
    </div>
  );
};
