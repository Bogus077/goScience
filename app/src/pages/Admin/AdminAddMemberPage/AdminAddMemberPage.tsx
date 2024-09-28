import React, { useEffect } from 'react';
import { AdminAddMember } from '../../../components/Admin/AdminAddMember';
import { AdminLayout } from '../../../components/Admin/AdminLayout';

export const AdminAddMemberPage = () => {
  useEffect(() => {
    document.title = 'Добавить кадета | ККА';
  });

  return (
    <AdminLayout>
      <AdminAddMember />
    </AdminLayout>
  );
};
