import React from 'react';
import { useTypedDispatch } from '../../../redux';
import { logOut } from '../../../redux/authSlice';
import { IconLogout } from '../Icons/IconLogout';
import styles from './Logout.module.scss';

export const Logout = () => {
  const dispatch = useTypedDispatch();
  const handleLogout = () => {
    dispatch(logOut());
  };

  return (
    <div className={styles.logout} onClick={handleLogout}>
      <IconLogout />
      <div className={styles.logout__text}>Выход</div>
    </div>
  );
};
