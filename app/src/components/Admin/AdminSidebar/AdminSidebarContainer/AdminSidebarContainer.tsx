import React, { ReactElement } from 'react';
import styles from './AdminSidebarContainer.module.scss';

type AdminSidebarContainerTypes = {
  title: string;
  children: ReactElement | ReactElement[];
};

export const AdminSidebarContainer = ({
  title,
  children,
}: AdminSidebarContainerTypes) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>{title}</div>
      <div className={styles.list}>{children}</div>
    </div>
  );
};
