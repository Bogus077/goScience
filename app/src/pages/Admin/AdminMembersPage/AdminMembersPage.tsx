import React, { useEffect } from 'react';
import { AdminLayout } from '../../../components/Admin/AdminLayout';
import { AdminMembers } from '../../../components/Admin/AdminMembers';

export const AdminMembersPage = () => {
  useEffect(() => {
    document.title = 'Кадеты | ККА';
  });

  return (
    <AdminLayout>
      <AdminMembers />
    </AdminLayout>
  );
};
