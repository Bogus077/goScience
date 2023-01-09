import { Avatar, Grid, Typography } from '@mui/material';
import { IconAlertTriangle } from '@tabler/icons';
import { formatDistance } from 'date-fns';
import { ru } from 'date-fns/locale';
import React from 'react';

type AdminNotifTypes = {
  header: string;
  text: string;
  type?: 'standart';
};

export const AdminNotif = ({
  text,
  header,
  type = 'standart',
}: AdminNotifTypes) => {
  return (
    <Grid container sx={{ width: '350px' }}>
      <Grid item xs={2}>
        <Avatar sx={{ bgcolor: '#ffc123' }}>
          <IconAlertTriangle />
        </Avatar>
      </Grid>

      <Grid item xs={10} container>
        <Grid item xs={8}>
          <Typography sx={{ fontWeight: 'bold' }}>{header}</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="caption">
            {formatDistance(new Date('01/09/2023'), new Date(), {
              addSuffix: true,
              locale: ru,
            })}
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ mt: 1 }}>
          <Typography variant="body2" color="GrayText">
            {text}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};
