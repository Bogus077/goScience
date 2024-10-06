import React from 'react';
import { Class } from '../../../models/Class/class';
import { ClassSettingRow } from './ClassSettingRow';
import styles from './ClassSettingsTable.module.scss';
import studentImg from '../../../assets/img/student.png';

type ClassSettingsTableTypes = {
  userClass: Class;
};

export const ClassSettingsTable = ({ userClass }: ClassSettingsTableTypes) => {
  return (
    <div className={styles.table}>
      <div className={styles.table__row}>
        <span className={styles.table__header}>Список учеников</span>
      </div>
      {userClass.Kids?.map((kid) => (
        <ClassSettingRow kid={kid} key={kid.id} />
      ))}
      {userClass.Kids?.length === 0 && (
        <div className={styles.table__empty}>
          <img src={studentImg} alt="student" />
          <span className={styles.table__empty_header}>Тут никого нет</span>
          <span className={styles.table__empty_descr}>
            В этот класс ещё не добавлен ни один ученик
          </span>
        </div>
      )}
    </div>
  );
};
