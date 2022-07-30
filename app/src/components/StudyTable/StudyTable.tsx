import React from 'react';
import { Kid } from '../../models/Kid/kid';
import { Select } from '../UI/Form/Select';
import styles from './StudyTable.module.scss';
import { StudyTableRow } from './StudyTableRow';

type StudyTableTypes = {
  kids: Kid[];
};

export const StudyTable = ({ kids }: StudyTableTypes) => {
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
      {kids.map((kid) => (
        <StudyTableRow
          key={kid.id}
          activity={11}
          name={kid.name}
          lastName={kid.surname}
        />
      ))}
    </div>
  );
};
