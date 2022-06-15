import React from 'react';
import { IconAssistant } from '../../Icons/MainMenu/IconAssistant';
import { IconProcess } from '../../Icons/MainMenu/IconProcess';
import { IconSettings } from '../../Icons/MainMenu/IconSettings';
import { IconStats } from '../../Icons/MainMenu/IconStats';
import classNames from 'classnames/bind';
import styles from './MainMenuItem.module.scss';
const cx = classNames.bind(styles);

type Props = {
  name: 'plan' | 'assistant' | 'classSettings' | 'stats';
  active?: boolean;
  expanded?: boolean;
};

export const MainMenuItem = ({
  name,
  active = false,
  expanded = false,
}: Props) => {
  const item = { label: 'Название', icon: <></> };

  switch (name) {
    case 'plan':
      item.label = 'Планирование';
      item.icon = <IconProcess active={active} />;
      break;
    case 'assistant':
      item.label = 'Ассистент';
      item.icon = <IconAssistant active={active} />;
      break;
    case 'classSettings':
      item.label = 'Настройки класса';
      item.icon = <IconSettings active={active} />;
      break;
    case 'stats':
      item.label = 'Статистика';
      item.icon = <IconStats active={active} />;
      break;
  }

  return (
    <div className={styles.item__wrapper}>
      <div className={cx('item', { item_active: active })}>{item.icon}</div>
      <div className={cx('item__label', { item__label_expanded: expanded })}>
        {item.label}
      </div>
    </div>
  );
};
