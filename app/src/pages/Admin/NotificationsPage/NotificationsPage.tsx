import React from 'react';
import { AdminLayout } from '../../../components/Admin/AdminLayout';
import { AdminNotifications } from '../../../components/Admin/AdminNotifications';

export const NotificationsPage = () => {
  return (
    <AdminLayout>
      <AdminNotifications />
    </AdminLayout>
  );
};
