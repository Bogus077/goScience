import React from 'react';
import { IconLogout } from '../Icons/IconLogout';
import styles from './Logout.module.scss';

export const Logout = () => {
  return (
    <div className={styles.logout}>
      <IconLogout />
      <div className={styles.logout__text}>Выход</div>
    </div>
  );
};
