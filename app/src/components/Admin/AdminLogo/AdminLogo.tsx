import React from 'react';
import { useNavigate } from 'react-router-dom';
import { frontendRoutes } from '../../../utils/router/routes';
import styles from './AdminLogo.module.scss';

export const AdminLogo = () => {
  const navigate = useNavigate();

  return (
    <div
      className={styles.logo}
      onClick={() => navigate(frontendRoutes.admin.mainPage)}
    >
      <div className={styles.black}>go</div>
      Science
    </div>
  );
};
