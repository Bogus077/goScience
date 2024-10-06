import React from 'react';
import { useNavigate } from 'react-router-dom';
import { frontendRoutes } from '../../../utils/router/routes';
import styles from './AdminLogo.module.scss';

export const AdminLogo = () => {
  const navigate = useNavigate();

  return (
    <div
      className={styles.logo}
      onClick={() => navigate(frontendRoutes.members)}
    >
      <div className={styles.black}>кк</div>
      Авангард
    </div>
  );
};
