import React, { useState } from 'react';
import { ClassChanger } from '../../ClassChanger';
import styles from './MainMenu.module.scss';
import { MainMenuItem } from './MainMenuItem';
import classNames from 'classnames/bind';
import { IconArrow } from '../Icons/MainMenu/IconArrow';
const cx = classNames.bind(styles);

export const MainMenu = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={cx('menu', {
        menu_expanded: expanded,
      })}
    >
      <div className={styles.menu__items}>
        <div className={styles.menu__item}>
          <MainMenuItem name="plan" active expanded={expanded} />
        </div>
        <div className={styles.menu__item}>
          <MainMenuItem name="assistant" expanded={expanded} />
        </div>
        <div className={styles.menu__item}>
          <MainMenuItem name="classSettings" expanded={expanded} />
        </div>
        <div className={styles.menu__item}>
          <MainMenuItem name="stats" expanded={expanded} />
        </div>
      </div>

      <div className={styles.menu__classChanger}>
        <ClassChanger />
      </div>

      <div className={styles.menu__user}>
        <div className={styles.avatar} />
      </div>

      <div
        className={styles.menu__expander}
        onClick={() => setExpanded(!expanded)}
      >
        <div>
          <IconArrow size={11} />
        </div>
      </div>
    </div>
  );
};
