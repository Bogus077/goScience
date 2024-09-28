import React, { useEffect } from 'react';
import { AdminAddTeacher } from '../../../components/Admin/AdminAddTeacher';
import { AdminLayout } from '../../../components/Admin/AdminLayout';

export const AdminAddTeacherPage = () => {
  useEffect(() => {
    document.title = 'Добавить преподавателя | ККА';
  });

  return (
    <AdminLayout>
      <AdminAddTeacher />
    </AdminLayout>
  );
};
