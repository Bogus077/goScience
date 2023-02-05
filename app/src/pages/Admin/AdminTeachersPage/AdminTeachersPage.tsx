import React from 'react';
import { AdminLayout } from '../../../components/Admin/AdminLayout';
import { AdminTeachers } from '../../../components/Admin/AdminTeachers';

export const AdminTeachersPage = () => {
  return (
    <AdminLayout>
      <AdminTeachers />
    </AdminLayout>
  );
};
