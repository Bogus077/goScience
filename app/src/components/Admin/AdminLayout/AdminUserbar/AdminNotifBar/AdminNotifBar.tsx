import {
  Chip,
  Grid,
  List,
  ListItem,
  ListItemButton,
  Typography,
} from '@mui/material';
import React from 'react';
import { AdminNotif } from './AdminNotif';

export const AdminNotifBar = () => {
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
          <ListItem disablePadding>
            <ListItemButton color="primary">
              <Grid container>
                <AdminNotif
                  header="Плановое обновление"
                  text="10 января 2022 года в 00:00 сервер будет перезапущен в связи с плановыми работами"
                />
              </Grid>
            </ListItemButton>
          </ListItem>
        </List>
      </Grid>
    </Grid>
  );
};
