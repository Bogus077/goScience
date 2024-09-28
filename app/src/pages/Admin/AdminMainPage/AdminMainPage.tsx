import { Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { AdminLayout } from '../../../components/Admin/AdminLayout';
import { AdminAttendanceWidget } from '../../../components/Admin/Widgets/AdminAttendanceWidget';
import { AdminBirthdayWidget } from '../../../components/Admin/Widgets/AdminBirthdayWidget';

export const AdminMainPage = () => {
  useEffect(() => {
    document.title = 'Панель администрирования | ККА';
  });

  return (
    <AdminLayout>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <AdminBirthdayWidget />
        </Grid>
        <Grid item xs={8}>
          <AdminAttendanceWidget />
        </Grid>
      </Grid>
    </AdminLayout>
  );
};
