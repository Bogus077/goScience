import React from 'react';
import styles from './MainMenu.module.scss';
import { MainMenuItem } from './MainMenuItem';

export const MainMenu = () => {
  return (
    <div className={styles.menu}>
      <div className={styles.menu__items}>
        <div className={styles.menu__item}>
          <MainMenuItem name="plan" active />
        </div>
        <div className={styles.menu__item}>
          <MainMenuItem name="assistant" />
        </div>
        <div className={styles.menu__item}>
          <MainMenuItem name="classSettings" />
        </div>
        <div className={styles.menu__item}>
          <MainMenuItem name="stats" />
        </div>
      </div>

      <div className={styles.menu__classChanger}>
        <span>Класс</span>
      </div>

      <div className={styles.menu__user}>
        <div className={styles.avatar} />
      </div>
    </div>
  );
};
