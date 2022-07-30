import React, { useState } from 'react';
import styles from './StudyTableRow.module.scss';
import classNames from 'classnames/bind';
import { IconArrow } from '../../UI/Icons/MainMenu/IconArrow';
import { UserCol } from '../../UserCol';
const cx = classNames.bind(styles);

type TableRowTypes = {
  activity: number;
  name: string;
  lastName: string;
};

export const StudyTableRow = ({ activity, name, lastName }: TableRowTypes) => {
  const [extended, setExtended] = useState(true);
  return (
    <div className={styles.row}>
      <div
        className={cx('row__arrow', {
          row__arrow_active: extended,
        })}
        onClick={() => setExtended(!extended)}
      >
        <IconArrow size={11} />
      </div>
      <UserCol activity={activity} name={name} lastName={lastName} />
    </div>
  );
};
