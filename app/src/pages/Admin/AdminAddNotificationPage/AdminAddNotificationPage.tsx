import React, { useEffect } from 'react';
import { AdminLayout } from '../../../components/Admin/AdminLayout';
import { AdminAddNotification } from '../../../components/Admin/AdminNotifications/AdminAddNotification';

export const AdminAddNotificationPage = () => {
  useEffect(() => {
    document.title = 'Добавить уведомление | ККА';
  });

  return (
    <AdminLayout>
      <AdminAddNotification />
    </AdminLayout>
  );
};
