import React from 'react';
import styles from './AdminMembersChooserPlat.module.scss';
import { Member } from '../../../../../models/members/members';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import classNames from 'classnames/bind';
import { sortBySurname } from '../../../../../utils/members/members';
const cx = classNames.bind(styles);

type AdminMembersChooserPlatTypes = {
  members: Member[];
  plat: number;
  handleChangeMembers: (member: Member) => void;
  isMemberActive: (member: Member) => boolean;
};

export const AdminMembersChooserPlat = ({
  members,
  plat,
  handleChangeMembers,
  isMemberActive,
}: AdminMembersChooserPlatTypes) => {
  return (
    <Grid
      container
      direction="column"
      minWidth={150}
      maxWidth={200}
      spacing={2}
    >
      {/* Заголовок */}
      <Grid item>
        <Typography className={styles.platHeader} fontWeight="bold">
          {plat === 5 ? 'Спортвзвод' : `${plat} Взвод`}
        </Typography>
      </Grid>

      {/* Кадеты */}
      <Grid item container direction="column" spacing={0}>
        {members.sort(sortBySurname).map((kid) => (
          <div key={kid.id} onClick={() => handleChangeMembers(kid)}>
            <Grid
              item
              container
              alignItems="center"
              justifyContent="space-between"
              className={styles.kid}
            >
              <Grid item xs={10}>
                <Typography
                  className={cx('kid__name', {
                    kid__name_active: isMemberActive(kid),
                  })}
                >{`${kid.surname} ${kid.name}`}</Typography>
              </Grid>

              <Grid item xs={2}>
                <Checkbox
                  size="small"
                  checked={isMemberActive(kid)}
                  onChange={() => handleChangeMembers(kid)}
                />
              </Grid>
            </Grid>
          </div>
        ))}
      </Grid>
    </Grid>
  );
};
