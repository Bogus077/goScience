import React, { useEffect } from 'react';
import { AdminLayout } from '../../../components/Admin/AdminLayout';
import { AdminNotifications } from '../../../components/Admin/AdminNotifications';

export const NotificationsPage = () => {
  useEffect(() => {
    document.title = 'Уведомления | ККА';
  });

  return (
    <AdminLayout>
      <AdminNotifications />
    </AdminLayout>
  );
};
