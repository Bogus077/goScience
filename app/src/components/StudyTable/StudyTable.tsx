import React from 'react';
import { Select } from '../UI/Form/Select';
import styles from './StudyTable.module.scss';
import { StudyTableRow } from './StudyTableRow';

export const StudyTable = () => {
  return (
    <div className={styles.table}>
      <div className={styles.table__header}>
        <span>Учеба</span>
        <Select
          onChange={() => {}}
          optionValues={['По активности', 'По фамилии']}
          options={['activity', 'lastname']}
        />
      </div>
      <StudyTableRow
        activity={11}
        name="Иван"
        lastName="Иванов"
        middleName="Иванович"
      />
    </div>
  );
};
