import React, { useState } from 'react';
import { Kid } from '../../models/Kid/kid';
import { Select } from '../UI/Form/Select';
import styles from './StudyTable.module.scss';
import { StudyTableRow } from './StudyTableRow';
import { countKidActivity } from '../../utils/kid/kid';

type StudyTableTypes = {
  kids: Kid[];
  isFetching?: boolean;
};

export const StudyTable = ({ kids, isFetching }: StudyTableTypes) => {
  const [extended, setExtended] = useState<number | undefined>(undefined);
  const [sortType, setSortType] = useState<'activity' | 'lastname'>('lastname');

  return (
    <div className={styles.table}>
      <div className={styles.table__header}>
        <span>Учеба</span>
        <Select
          onChange={(event) => {
            setSortType(event.target.value as 'activity' | 'lastname');
          }}
          optionValues={['По фамилии', 'По активности']}
          options={['lastname', 'activity']}
        />
      </div>
      {[...kids]
        .sort((a, b) =>
          sortType === 'activity'
            ? countKidActivity(b) - countKidActivity(a)
            : a.surname.localeCompare(b.surname)
        )
        .map((kid) => (
          <StudyTableRow
            key={kid.id}
            kid={kid}
            isFetching={isFetching}
            extended={extended}
            setExtended={setExtended}
          />
        ))}
    </div>
  );
};
