import React from 'react';
import { Tip } from '../UI/Tip';
import styles from './ClassChanger.module.scss';

type ClassChangerTypes = {
  userClass: string;
};

export const ClassChanger = ({ userClass }: ClassChangerTypes) => {
  return (
    <div className={styles.class}>
      <span className={styles.class__name}>{userClass}</span>
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
