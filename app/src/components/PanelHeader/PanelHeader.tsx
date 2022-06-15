import React from 'react';
import { Clock } from '../UI/Clock';
import { Logout } from '../UI/Logout';
import styles from './PanelHeader.module.scss';

export const PanelHeader = () => {
  return (
    <div className={styles.header}>
      <div className={styles.clock}>
        <Clock />
      </div>
      <div className={styles.logout}>
        <Logout />
      </div>
    </div>
  );
};
