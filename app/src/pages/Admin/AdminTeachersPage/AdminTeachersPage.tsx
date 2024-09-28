import React, { useEffect } from 'react';
import { AdminLayout } from '../../../components/Admin/AdminLayout';
import { AdminTeachers } from '../../../components/Admin/AdminTeachers';

export const AdminTeachersPage = () => {
  useEffect(() => {
    document.title = 'Преподаватели | ККА';
  });

  return (
    <AdminLayout>
      <AdminTeachers />
    </AdminLayout>
  );
};
