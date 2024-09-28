import React from 'react';
import { Member } from '../../../models/members/members';
import { sortBySurname } from '../../../utils/members/members';
import classNames from 'classnames/bind';
import styles from './MembersPrintPlat.module.scss';
const cx = classNames.bind(styles);

type MembersPrintPlatTypes = {
  kids: Member[];
  plat: number;
};

export const MembersPrintPlat = ({ kids, plat }: MembersPrintPlatTypes) => {
  const kidsIll = kids.reduce((sum, kid) => (kid.status ? sum : sum + 1), 0);

  return (
    <div className={styles.plat}>
      <div className={styles.plat__header}>{`${plat} ВЗВОД`}</div>
      <div className={styles.sum}>
        <div className={styles.sum__row}>
          <div className={styles.sum__type}>Всего</div>
          <div className={styles.sum__count}>{kids.length}</div>
        </div>
        <div className={styles.sum__row}>
          <div className={styles.sum__type}>Налицо</div>
          <div className={styles.sum__count}>{kids.length - kidsIll}</div>
        </div>
        <div className={styles.sum__row}>
          <div className={styles.sum__type}>Отсутствует</div>
          <div className={styles.sum__count}>{kidsIll}</div>
        </div>
      </div>

      {kids.sort(sortBySurname).map((kid, num) => (
        <div
          className={cx('kid', {
            kid_ill: !kid.status,
          })}
          key={kid.id}
        >
          <div className={styles.kid__number}>{num + 1}</div>
          <div className={styles.kid__name}>
            <span>{`${kid.surname} ${kid.name}`}</span>
          </div>
          <div className={styles.kid__status}>{kid.status ? '' : 'б'}</div>
        </div>
      ))}
    </div>
  );
};
