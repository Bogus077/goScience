import React, { useState } from 'react';
import { ClassChanger } from '../../ClassChanger';
import styles from './MainMenu.module.scss';
import classNames from 'classnames/bind';
import { IconArrow } from '../Icons/MainMenu/IconArrow';
import { useLocation, useNavigate } from 'react-router-dom';
import { frontendRoutes } from '../../../utils/router/routes';
import { User } from '../../../models/User/user';
import { MainMenuItem } from '../MainMenu/MainMenuItem';
const cx = classNames.bind(styles);

type MainMenuTypes = {
  user: User;
};

export const MainMenuMobile = ({ user }: MainMenuTypes) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className={cx('menu')}>
      <div className={styles.menu__items}>
        <div className={styles.menu__item}>
          <MainMenuItem
            name="plan"
            active={new RegExp(frontendRoutes.plan.index).test(
              location.pathname
            )}
            onClick={() => navigate(frontendRoutes.plan.study)}
          />
        </div>
        <div className={styles.menu__item}>
          <MainMenuItem name="assistant" disabled />
        </div>
        <div className={styles.menu__item}>
          <MainMenuItem
            name="classSettings"
            active={new RegExp(frontendRoutes.settings.class).test(
              location.pathname
            )}
            onClick={() => navigate(frontendRoutes.settings.class)}
          />
        </div>
        <div className={styles.menu__item}>
          <MainMenuItem name="stats" disabled />
        </div>
      </div>

      <div className={styles.menu__classChanger}>
        <ClassChanger
          userClass={user.UserSetting?.Class?.label ?? '??'}
          classes={user.Classes}
        />
      </div>
    </div>
  );
};
