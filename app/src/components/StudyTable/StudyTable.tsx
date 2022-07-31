import React, { useState } from 'react';
import { Kid } from '../../models/Kid/kid';
import { Select } from '../UI/Form/Select';
import styles from './StudyTable.module.scss';
import { StudyTableRow } from './StudyTableRow';

type StudyTableTypes = {
  kids: Kid[];
};

export const StudyTable = ({ kids }: StudyTableTypes) => {
  //TODO set to undefined
  const [extended, setExtended] = useState<number | undefined>(1);

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
          kid={kid}
          extended={extended}
          setExtended={setExtended}
          activity={11}
        />
      ))}
    </div>
  );
};
