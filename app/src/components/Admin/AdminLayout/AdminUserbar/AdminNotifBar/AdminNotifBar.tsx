import {
  Chip,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  Typography,
} from '@mui/material';
import React, { useMemo } from 'react';
import { useGetNotificationsQuery } from '../../../../../redux/GSApi';
import { AdminNotif } from './AdminNotif';

export const AdminNotifBar = () => {
  const { data: notifications } = useGetNotificationsQuery('');

  const sotredNotifications = useMemo(
    () => [...(notifications ?? [])].sort((a, b) => b.id - a.id),
    [notifications]
  );

  return (
    <Grid container direction="column">
      <Grid item container sx={{ p: 2 }} spacing={2} alignItems="center">
        <Grid item>
          <Typography sx={{ fontWeight: 'bold' }} variant="subtitle2">
            Все уведомления
          </Typography>
        </Grid>
        <Grid item>
          <Chip label="0" size="small" />
        </Grid>
      </Grid>
      <Grid item>
        <List>
          {sotredNotifications.map((n) => (
            <>
              <Divider />
              <ListItem disablePadding key={n.id}>
                <ListItemButton color="primary">
                  <Grid container>
                    <AdminNotif
                      header={n.title}
                      text={n.text}
                      date={n.createdAt}
                    />
                  </Grid>
                </ListItemButton>
              </ListItem>
            </>
          ))}
        </List>
      </Grid>
    </Grid>
  );
};
