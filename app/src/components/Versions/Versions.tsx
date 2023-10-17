import React from 'react';
import styles from './Versions.module.scss';
import { VersionItem } from './VersionItem';

// 1.0.1
// Поправлен баг со статистикой посещаемости - календарь неверно сортировал числа месяца
// Поправлен баг с неверным отображением возраста во время оповещения о ДР

export const Versions = () => {
  return (
    <div className={styles.main}>
      <VersionItem />
    </div>
  );
};
