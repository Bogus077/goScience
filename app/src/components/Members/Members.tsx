import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { Stack } from '@mui/system';
import classNames from 'classnames/bind';
import React, { useCallback, useRef, useState } from 'react';
import {
  ChangeMemberStatusRequest,
  Member,
} from '../../models/members/members';
import { Notification } from '../../models/Notifications/Notifications';
import { getPlat } from '../../utils/members/members';
import styles from './Members.module.scss';
import { MembersPlat } from './MembersPlat';
import { MembersStatus } from './MembersStatus';
import { formatDuration, intervalToDuration, subYears } from 'date-fns';
import ru from 'date-fns/locale/ru';
const cx = classNames.bind(styles);

type MembersTypes = {
  kids: Member[];
  notifications: Notification[];
  isLoading: boolean;
  changeMemberStatus: (data: ChangeMemberStatusRequest) => void;
  connectionStatus: boolean;
};

export const Members = ({
  kids,
  notifications,
  isLoading,
  changeMemberStatus,
  connectionStatus,
}: MembersTypes) => {
  const [genderSeparate, setGenderSeparate] = useState(false);
  const [isPageToPrint, setPageToPrint] = useState(false);

  const handleChangeStatus = useCallback(
    async (id: number, status: boolean) => {
      changeMemberStatus({ id, status });
    },
    [changeMemberStatus]
  );

  const plats = [
    getPlat(kids, 1),
    getPlat(kids, 2),
    getPlat(kids, 3),
    getPlat(kids, 4),
    getPlat(kids, 5),
  ];

  const tableRef = useRef<HTMLDivElement>(null);

  const scrollRight = (plat: number) => {
    tableRef.current?.scroll({
      left: window ? (window.innerWidth + 20) * (plat - 1) : 0,
      behavior: 'smooth',
    });
  };

  const kidsIll = kids.reduce((sum, kid) => (kid.status ? sum : sum + 1), 0);

  const printPage = useCallback(() => {
    if (window) {
      setPageToPrint(true);
    }
  }, []);

  const dobToday: string[] = [];
  kids.forEach((kid) => {
    if (kid.dob) {
      const dob = new Date(kid.dob);
      const today = new Date();
      const isToday =
        `${dob.getDate()} ${dob.getMonth()}` ===
        `${today.getDate()} ${today.getMonth()}`;

      const years = formatDuration(
        intervalToDuration({
          start: subYears(new Date(kid.dob).setHours(23, 59, 59), 1),
          end: new Date(),
        }),
        {
          format: ['years'],
          locale: ru,
        }
      );
      if (isToday) dobToday.push(`${kid.surname} ${kid.name} - ${years}`);
    }
  });

  return (
    <div
      className={cx('members', {
        members_print: isPageToPrint,
      })}
    >
      <Stack spacing={2}>
        {notifications.map((notif) => (
          <Alert severity="info" variant="outlined" key={notif.id}>
            <AlertTitle>{notif.title}</AlertTitle>
            {notif.text}
          </Alert>
        ))}
      </Stack>

      <div className={styles.members__status}>
        <MembersStatus status={connectionStatus} isLoading={isLoading} />
      </div>
      <div className={styles.members__sum}>
        <div className={styles.members__sumItem}>
          <div className={styles.members__sumHeader}>Всего: </div>
          <div className={styles.members__sumNumber}>{kids.length}</div>
        </div>
        <div className={cx('members__sumItem', 'members__sumItem_positive')}>
          <div className={styles.members__sumHeader}>В строю: </div>
          <div className={styles.members__sumNumber}>
            {kids.length - kidsIll}
          </div>
        </div>
        <div className={cx('members__sumItem', 'members__sumItem_negative')}>
          <div className={styles.members__sumHeader}>Болеют: </div>
          <div className={styles.members__sumNumber}>{kidsIll}</div>
        </div>
      </div>

      <div className={styles.members__table} ref={tableRef}>
        {plats.map((plat, key) => (
          <MembersPlat
            kids={plat}
            key={key}
            plat={key + 1}
            handleChangeStatus={handleChangeStatus}
            genderSeparate={genderSeparate}
            setGenderSeparate={setGenderSeparate}
            printPage={printPage}
            isPageToPrint={isPageToPrint}
          />
        ))}
      </div>
      <div className={styles.switcher}>
        <div className={styles.switcher__item} onClick={() => scrollRight(1)}>
          1
        </div>
        <div className={styles.switcher__item} onClick={() => scrollRight(2)}>
          2
        </div>
        <div className={styles.switcher__item} onClick={() => scrollRight(3)}>
          3
        </div>
        <div className={styles.switcher__item} onClick={() => scrollRight(4)}>
          4
        </div>
        <div className={styles.switcher__item} onClick={() => scrollRight(5)}>
          Спорт
        </div>
      </div>

      {dobToday.length > 0 && (
        <Alert severity="info" variant="outlined">
          <AlertTitle>День рождения сегодня:</AlertTitle>
          {dobToday.join(', ')}
        </Alert>
      )}

      {isPageToPrint ? (
        <div className={styles.author}>
          Распечатано: {` `}
          {`${new Date().toLocaleDateString()} || ${new Date().getHours()}:${new Date().getMinutes()}`}
        </div>
      ) : (
        <div className={styles.author}>
          <strong>Дизайн и разработка приложения:</strong> <br /> Владислав
          Андреевич Ш. <br /> 2022 - 2023 год
        </div>
      )}
    </div>
  );
};
