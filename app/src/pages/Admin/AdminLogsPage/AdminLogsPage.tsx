import React, { useCallback, useState } from 'react';
import { AdminLayout } from '../../../components/Admin/AdminLayout';
import { AdminLogs } from '../../../components/Admin/AdminLogs';
import { LogsFilters } from '../../../models/Logs/logs';
import { useGetLogsQuery } from '../../../redux/GSApi';

export const AdminLogsPage = () => {
  const [filters, setFilters] = useState<LogsFilters>({});
  const handleChangeFilters = useCallback((filters: LogsFilters) => {
    setFilters(filters);
  }, []);

  const { data, isLoading } = useGetLogsQuery(filters);

  return (
    <AdminLayout>
      <AdminLogs
        logs={data ?? []}
        isLoading={isLoading}
        filters={filters}
        setFilters={handleChangeFilters}
      />
    </AdminLayout>
  );
};
