import React, { useEffect } from 'react';
import { Member } from '../../models/members/members';
import { getPlat } from '../../utils/members/members';
import classNames from 'classnames/bind';
import styles from './MembersPrint.module.scss';
import { MembersPrintPlat } from './MembersPrintPlat';
import { useNavigate } from 'react-router-dom';
import { frontendRoutes } from '../../utils/router/routes';
const cx = classNames.bind(styles);

type MembersPrintTypes = {
  kids: Member[];
};

export const MembersPrint = ({ kids }: MembersPrintTypes) => {
  const navigate = useNavigate();
  const plats = [
    getPlat(kids, 1),
    getPlat(kids, 2),
    getPlat(kids, 3),
    getPlat(kids, 4),
    getPlat(kids, 5),
  ];

  const kidsIll = kids.reduce((sum, kid) => (kid.status ? sum : sum + 1), 0);

  const printPage = () => {
    if (window) {
      window.print();
    }
    setTimeout(() => navigate(frontendRoutes.members), 1000);
  };

  useEffect(() => {
    if (window) {
      printPage();
    }
  });

  return (
    <div className={cx('members')}>
      <div className={styles.members__header}>Расход личного состава</div>

      <div className={styles.members__table}>
        {plats.map((plat, key) => (
          <MembersPrintPlat kids={plat} key={key} plat={key + 1} />
        ))}
      </div>

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

      <div className={styles.author}>
        Распечатано: {` `}
        {`${new Date().toLocaleDateString()} || ${new Date().getHours()}:${new Date().getMinutes()}`}
      </div>
    </div>
  );
};
