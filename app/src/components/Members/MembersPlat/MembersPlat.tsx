import React from 'react';
import { Member } from '../../../models/members/members';
import { sortBySurname } from '../../../utils/members/members';
import classNames from 'classnames/bind';
import styles from './MembersPlat.module.scss';
import { Submenu } from '../../UI/Submenu';
const cx = classNames.bind(styles);

type MembersPlatTypes = {
  kids: Member[];
  plat: number;
  handleChangeStatus: (id: number, status: boolean) => Promise<void>;
  genderSeparate: boolean;
  setGenderSeparate: React.Dispatch<React.SetStateAction<boolean>>;
  printPage: () => void;
  isPageToPrint: boolean;
};

export const MembersPlat = ({
  kids,
  plat,
  handleChangeStatus,
  genderSeparate,
  setGenderSeparate,
  printPage,
  isPageToPrint,
}: MembersPlatTypes) => {
  const kidsIll = kids.reduce((sum, kid) => (kid.status ? sum : sum + 1), 0);

  return (
    <div
      className={cx('plat', {
        plat_print: isPageToPrint,
      })}
    >
      <div className={styles.plat__header}>
        <span>{`${plat} Взвод`}</span>
        <div className={styles.plat__submenu}>
          <Submenu
            direction="down"
            links={[
              // {
              //   title: 'Все отсутствуют',
              //   onClick: () => {},
              // },
              {
                title: genderSeparate ? 'Убрать выделение' : 'Выделить девочек',
                onClick: () => setGenderSeparate(!genderSeparate),
              },
              {
                title: 'Печать',
                onClick: () => printPage(),
              },
            ]}
          />
        </div>
      </div>

      <div className={styles.plat__counts}>
        <div className={styles.plat__row}>
          <span>Всего</span>
          <div className={styles.plat__number}>{kids.length}</div>
        </div>
        <div className={styles.plat__row}>
          <span>В строю</span>
          <div className={cx('plat__number', 'plat__number_positive')}>
            {kids.length - kidsIll}
          </div>
        </div>
        <div className={styles.plat__row}>
          <span>Болеют</span>
          <div className={cx('plat__number', 'plat__number_negative')}>
            {kidsIll}
          </div>
        </div>
      </div>

      {kids.sort(sortBySurname).map((kid, key) => (
        <div
          className={cx('plat__kid', {
            plat__kid_female: kid.sex === 'female' && genderSeparate,
            plat__kid_ill: !kid.status,
          })}
          key={kid.id}
          onClick={() => handleChangeStatus(kid.id, !kid.status)}
        >
          <span>{`${kid.surname} ${kid.name}`}</span>
          {isPageToPrint ? (
            <div className={styles.plat__status}>б</div>
          ) : (
            <div className={styles.plat__status} />
          )}
        </div>
      ))}
    </div>
  );
};
