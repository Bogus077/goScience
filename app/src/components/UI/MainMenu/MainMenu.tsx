import React, { useState } from 'react';
import { ClassChanger } from '../../ClassChanger';
import styles from './MainMenu.module.scss';
import { MainMenuItem } from './MainMenuItem';
import classNames from 'classnames/bind';
import { IconArrow } from '../Icons/MainMenu/IconArrow';
import { useLocation, useNavigate } from 'react-router-dom';
import { frontendRoutes } from '../../../utils/router/routes';
import { User } from '../../../models/User/user';
const cx = classNames.bind(styles);

type MainMenuTypes = {
  user: User;
};

export const MainMenu = ({ user }: MainMenuTypes) => {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div
      className={cx('menu', {
        menu_expanded: expanded,
      })}
    >
      <div className={styles.menu__items}>
        <div className={styles.menu__item}>
          <MainMenuItem
            name="plan"
            active={new RegExp(frontendRoutes.plan.index).test(
              location.pathname
            )}
            expanded={expanded}
            onClick={() => navigate(frontendRoutes.plan.index)}
          />
        </div>
        <div className={styles.menu__item}>
          <MainMenuItem name="assistant" expanded={expanded} />
        </div>
        <div className={styles.menu__item}>
          <MainMenuItem
            name="classSettings"
            expanded={expanded}
            active={new RegExp(frontendRoutes.settings.class).test(
              location.pathname
            )}
            onClick={() => navigate(frontendRoutes.settings.class)}
          />
        </div>
        <div className={styles.menu__item}>
          <MainMenuItem name="stats" expanded={expanded} />
        </div>
      </div>

      <div className={styles.menu__classChanger}>
        <ClassChanger
          userClass={user.UserSetting?.Class?.label ?? '??'}
          classes={user.Classes}
        />
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
