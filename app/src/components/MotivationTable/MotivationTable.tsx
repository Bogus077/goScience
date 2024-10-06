import React, { useState } from 'react';
import { GetSummaryResponse } from '../../models/summary/summary';
import { SwitchBar } from '../UI/SwitchBar';
import styles from './MotivationTable.module.scss';
import { MotivationTableRow } from './MotivationTableRow';

type MotivationTableTypes = {
  kids: GetSummaryResponse;
};

export const MotivationTable = ({ kids }: MotivationTableTypes) => {
  const [period, setPeriod] = useState(1);

  const filteredKids = [...kids].sort((a, b) => {
    const aHasTasks =
      a.KidSummaryTasks.length > 0 ||
      a.KidSummaryProjectTasks.length > 0 ||
      a.KidSummaryUsers?.length > 0;
    const bHasTasks =
      b.KidSummaryTasks.length > 0 ||
      b.KidSummaryProjectTasks.length > 0 ||
      b.KidSummaryUsers?.length > 0;
    if (aHasTasks && !bHasTasks) {
      return -1;
    }
    if (!aHasTasks && bHasTasks) {
      return 1;
    }
    return 0;
  });

  return (
    <div className={styles.table}>
      <SwitchBar
        items={[
          { label: 'День', active: period === 1, id: 1 },
          { label: 'Неделя', active: period === 2, id: 2 },
        ]}
        handleChangeActive={setPeriod}
      />

      <div className={styles.table__body}>
        {filteredKids.map((kid) => (
          <MotivationTableRow kid={kid} period={period} key={kid.id} />
        ))}
      </div>
    </div>
  );
};
