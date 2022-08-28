import React, { useState } from 'react';
import { GetSummaryResponse } from '../../models/summary/summary';
import { SwitchBar } from '../UI/SwitchBar';
import styles from './MotivationTable.module.scss';

type MotivationTableTypes = {
  kids: GetSummaryResponse;
};

export const MotivationTable = ({ kids }: MotivationTableTypes) => {
  const [period, setPeriod] = useState(1);

  return (
    <div className={styles.table}>
      <SwitchBar
        items={[
          { label: 'День', active: period === 1, id: 1 },
          { label: 'Неделя', active: period === 2, id: 2 },
        ]}
        handleChangeActive={setPeriod}
      />
    </div>
  );
};
