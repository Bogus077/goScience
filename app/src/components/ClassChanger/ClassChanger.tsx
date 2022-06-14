import React from 'react';
import { Tip } from '../UI/Tip';
import styles from './ClassChanger.module.scss';

export const ClassChanger = () => {
  return (
    <div className={styles.class}>
      <span className={styles.class__name}>5Г</span>
      <div className={styles.class__menu}>
        <span>класс</span> <div className={styles.triangle} />
      </div>
      <Tip side="right">
        <div style={{ padding: '20px' }}>
          <span>Здесь будет меню выбора класса</span>
        </div>
      </Tip>
    </div>
  );
};
