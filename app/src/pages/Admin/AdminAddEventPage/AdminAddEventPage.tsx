import React, { useEffect } from 'react';
import { AdminAddEvent } from '../../../components/Admin/AdminAddEvent';
import { AdminLayout } from '../../../components/Admin/AdminLayout';

export const AdminAddEventPage = () => {
  useEffect(() => {
    document.title = 'Добавить мероприятие | ККА';
  });

  return (
    <AdminLayout>
      <AdminAddEvent />
    </AdminLayout>
  );
};
