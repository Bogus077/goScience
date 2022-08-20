import React, { useEffect } from 'react';
import { KidWeekSummary } from '../../components/KidWeekSummary';
import styles from './KidWeekSummaryPage.module.scss';

export const KidWeekSummaryPage = () => {
  useEffect(() => {
    document.title = 'Ну что, подведём итоги? | GS';
  });

  return (
    <div className={styles.page}>
      <KidWeekSummary />
    </div>
  );
};
