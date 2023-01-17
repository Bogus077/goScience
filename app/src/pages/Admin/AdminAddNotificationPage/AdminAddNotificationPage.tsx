import React from 'react';
import { AdminLayout } from '../../../components/Admin/AdminLayout';
import { AdminAddNotification } from '../../../components/Admin/AdminNotifications/AdminAddNotification';

export const AdminAddNotificationPage = () => {
  return (
    <AdminLayout>
      <AdminAddNotification />
    </AdminLayout>
  );
};
