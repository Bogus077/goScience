import React from 'react';
import styles from './UserCol.module.scss';

type UserColTypes = {
  activity: number;
  name: string;
  lastName: string;
  middleName: string;
};

export const UserCol = ({
  activity,
  name,
  lastName,
  middleName,
}: UserColTypes) => {
  return (
    <div className={styles.user}>
      <div className={styles.user__activity}>{activity}</div>
      <div className={styles.user__name}>
        <div>{lastName}</div>
        <div>{`${name} ${middleName}`}</div>
      </div>
    </div>
  );
};
