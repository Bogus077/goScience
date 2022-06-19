import React from 'react';
import classNames from 'classnames/bind';
import styles from './PlanPanelMenuItem.module.scss';
import { IconProcess } from '../../../UI/Icons/MainMenu/IconProcess';
import { IconStudy } from '../../../UI/Icons/PlanMenu/IconStudy';
import { IconMotivation } from '../../../UI/Icons/PlanMenu/IconMotivation';
import { IconDiscipline } from '../../../UI/Icons/PlanMenu/IconDiscipline';
import { IconCollective } from '../../../UI/Icons/PlanMenu/IconCollective';
const cx = classNames.bind(styles);

type Props = {
  title: 'study' | 'motivation' | 'discipline' | 'collective';
  active?: boolean;
};

export const PlanPanelMenuItem = ({ title, active = false }: Props) => {
  const item = {
    title: 'Название',
    icon: <IconProcess />,
  };
  switch (title) {
    case 'study':
      item.title = 'Учеба';
      item.icon = <IconStudy active={active} />;
      break;
    case 'motivation':
      item.title = 'Мотивация';
      item.icon = <IconMotivation active={active} />;
      break;
    case 'discipline':
      item.title = 'Дисциплина';
      item.icon = <IconDiscipline active={active} />;
      break;
    case 'collective':
      item.title = 'Коллектив';
      item.icon = <IconCollective active={active} />;
      break;
  }

  return (
    <div
      className={cx('item', {
        item_active: active,
      })}
    >
      {item.icon}
      <div className={styles.title}>{item.title}</div>

      <div className={styles.triangle} />
    </div>
  );
};
