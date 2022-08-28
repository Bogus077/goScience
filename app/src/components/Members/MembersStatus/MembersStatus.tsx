import React from 'react';
import classNames from 'classnames/bind';
import styles from './MembersStatus.module.scss';
const cx = classNames.bind(styles);

type MembersStatusTypes = {
  status: boolean;
  isLoading?: boolean;
};

export const MembersStatus = ({ status, isLoading }: MembersStatusTypes) => {
  return (
    <div className={styles.status}>
      <div className={styles.statusDate}></div>
      <div className={styles.statusIndicator}>
        <div
          className={cx('statusIcon', {
            statusIcon_negative: !status,
            statusIcon_loading: isLoading,
          })}
        />
        <span>
          {isLoading
            ? 'Обновляю данные'
            : status
            ? 'Актуально'
            : 'Соединение потеряно. Обновите страницу, прежде чем вносить изменения в расход.'}
        </span>
      </div>
    </div>
  );
};
