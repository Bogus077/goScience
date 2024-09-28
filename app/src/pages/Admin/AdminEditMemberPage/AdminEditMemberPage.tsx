import React, { useEffect } from 'react';
import { AdminEditMember } from '../../../components/Admin/AdminEditMember';
import { AdminLayout } from '../../../components/Admin/AdminLayout';

export const AdminEditMemberPage = () => {
  useEffect(() => {
    document.title = 'Редактировать кадета | ККА';
  });

  return (
    <AdminLayout>
      <AdminEditMember />
    </AdminLayout>
  );
};
