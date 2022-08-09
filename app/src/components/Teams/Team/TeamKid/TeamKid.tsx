import React from 'react';
import { Kid } from '../../../../models/Kid/kid';
import styles from './TeamKid.module.scss';

type TeamKidTypes = {
  kid: Kid;
};

export const TeamKid = ({ kid }: TeamKidTypes) => {
  return (
    <div className={styles.kid}>{`${kid.surname} ${kid.name.slice(
      0,
      1
    )}.`}</div>
  );
};
