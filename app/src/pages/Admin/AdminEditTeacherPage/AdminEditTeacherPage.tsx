import React, { useEffect } from 'react';
import { AdminEditTeacher } from '../../../components/Admin/AdminEditTeacher';
import { AdminLayout } from '../../../components/Admin/AdminLayout';
import { useGetUsersQuery } from '../../../redux/GSApi';
import { useParams } from 'react-router-dom';
import { PageLoader } from '../../../components/UI/PageLoader';

export const AdminEditTeacherPage = () => {
  const { id } = useParams();
  const { data: users, isLoading } = useGetUsersQuery('');
  const user = users?.find((user) => user.id === parseInt(id ?? ' 0'));

  useEffect(() => {
    document.title = 'Редактировать преподавателя | ККА';
  });

  return (
    <AdminLayout>
      {isLoading || !id || !user ? (
        <PageLoader />
      ) : (
        <AdminEditTeacher teacher={user} />
      )}
    </AdminLayout>
  );
};
