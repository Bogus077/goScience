import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import React from 'react';
import { useGetNotificationsQuery } from '../../../redux/GSApi';
import { PageLoader } from '../../UI/PageLoader';
import { AdminNotificationsTable } from './AdminNotificationsTable';
import { IconSquarePlus } from '@tabler/icons';
import { useNavigate } from 'react-router-dom';
import { frontendRoutes } from '../../../utils/router/routes';

export const AdminNotifications = () => {
  const { data, isLoading: isGetNotificationsLoading } =
    useGetNotificationsQuery('');
  const navigate = useNavigate();

  return (
    <Grid container>
      {isGetNotificationsLoading ? (
        <PageLoader />
      ) : (
        <Grid item xs={12} container spacing={2}>
          <Grid item xs={12} container justifyContent="flex-end">
            <Grid item>
              <Button
                startIcon={<IconSquarePlus />}
                variant="contained"
                onClick={() => navigate(frontendRoutes.admin.addNotification)}
              >
                Добавить уведомление
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <AdminNotificationsTable notifications={data ?? []} />
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};
