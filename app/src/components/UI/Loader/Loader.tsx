import React from 'react';
import styles from './Loader.module.scss';

export const Loader = () => {
  return (
    <div className={styles.loader}>
      <div className={styles.loading}>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
      </div>
    </div>
  );
};
