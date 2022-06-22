import React from 'react';
import classNames from 'classnames/bind';
import styles from './PlanPanelMenuItem.module.scss';
import { IconProcess } from '../../../UI/Icons/MainMenu/IconProcess';
import { IconStudy } from '../../../UI/Icons/PlanMenu/IconStudy';
import { IconMotivation } from '../../../UI/Icons/PlanMenu/IconMotivation';
import { IconDiscipline } from '../../../UI/Icons/PlanMenu/IconDiscipline';
import { IconCollective } from '../../../UI/Icons/PlanMenu/IconCollective';
import { frontendRoutes } from '../../../../utils/router/routes';
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles);

type Props = {
  title: 'study' | 'motivation' | 'discipline' | 'collective';
  active?: boolean;
};

export const PlanPanelMenuItem = ({ title, active = false }: Props) => {
  const navigate = useNavigate();

  const item = {
    title: 'Название',
    icon: <IconProcess />,
    link: '/plan',
  };
  switch (title) {
    case 'study':
      item.title = 'Учеба';
      item.icon = <IconStudy active={active} />;
      item.link = frontendRoutes.plan.study;
      break;
    case 'motivation':
      item.title = 'Мотивация';
      item.icon = <IconMotivation active={active} />;
      item.link = frontendRoutes.plan.motivation;
      break;
    case 'discipline':
      item.title = 'Дисциплина';
      item.icon = <IconDiscipline active={active} />;
      item.link = frontendRoutes.plan.discipline;
      break;
    case 'collective':
      item.title = 'Коллектив';
      item.icon = <IconCollective active={active} />;
      item.link = frontendRoutes.plan.team;
      break;
  }

  return (
    <div
      className={cx('item', {
        item_active: active,
      })}
      onClick={() => navigate(item.link)}
    >
      {item.icon}
      <div className={styles.title}>{item.title}</div>

      <div className={styles.triangle} />
    </div>
  );
};
