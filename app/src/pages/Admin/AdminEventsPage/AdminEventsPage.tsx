import React, { useEffect } from 'react';
import { AdminLayout } from '../../../components/Admin/AdminLayout';
import { AdminEvents } from '../../../components/Admin/AdminEvents';
import { useGetEventsQuery } from '../../../redux/GSApi';
import { PageLoader } from '../../../components/UI/PageLoader';

export const AdminEventsPage = () => {
  const { data: events, isLoading } = useGetEventsQuery();

  useEffect(() => {
    document.title = 'Мероприятия | ККА';
  });

  return (
    <AdminLayout>
      {isLoading ? <PageLoader /> : <AdminEvents events={events ?? []} />}
    </AdminLayout>
  );
};