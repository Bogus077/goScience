import React from 'react';
import { AdminLayout } from '../../../components/Admin/AdminLayout';
import { AdminEditEvent } from '../../../components/Admin/AdminEditEvent';
import { useParams } from 'react-router-dom';
import { useGetEventQuery } from '../../../redux/GSApi';
import { PageLoader } from '../../../components/UI/PageLoader';

export const AdminEditEventPage = () => {
  const { id } = useParams();
  const { data: event, isLoading } = useGetEventQuery({
    id: parseInt(id ?? '1'),
  });
  return (
    <AdminLayout>
      {isLoading || !id || !event ? (
        <PageLoader />
      ) : (
        <AdminEditEvent event={event} />
      )}
    </AdminLayout>
  );
};
