import React, { useEffect } from 'react';
import { Kid } from '../../../../models/Kid/kid';
import { addKidInitialValues } from '../../../../models/Validations/validations';
import styles from './AddKidsTable.module.scss';
import { AddKidsTableRow } from './AddKidsTableRow';

type AddKidsTableTypes = {
  kids: Kid[];
  setKids: React.Dispatch<React.SetStateAction<Kid[]>>;
};

export const AddKidsTable = ({ kids, setKids }: AddKidsTableTypes) => {
  const lastRecord = kids[kids.length - 1];

  useEffect(() => {
    if (lastRecord.name !== '' && lastRecord.surname !== '') {
      setKids([...kids, addKidInitialValues]);
    }
  }, [kids, lastRecord, setKids]);

  return (
    <div className={styles.table}>
      <span className={styles.table__header}>Добавить детей в класс</span>
      <span className={styles.table__subheader}>
        Сейчас можно пропустить - добавить детей можно будет и позже, выбрав в
        меню Настройки класса.
      </span>
      {kids.map((kid, key) => (
        <AddKidsTableRow key={key} index={key} setKids={setKids} kids={kids} />
      ))}
    </div>
  );
};
