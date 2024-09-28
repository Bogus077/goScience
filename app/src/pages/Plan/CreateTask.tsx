import React, { useEffect } from 'react';
import { CreateTask } from '../../components/CreateTask';
import { Layout } from '../../components/Layout';
import { PageLoader } from '../../components/UI/PageLoader';
import { useGetCurrentClassQuery } from '../../redux/GSApi';

export const CreateTaskPage = () => {
  const { data, isLoading } = useGetCurrentClassQuery('');
  useEffect(() => {
    document.title = 'Добавить задание | ККА';
  });

  return (
    <Layout>
      {!data || isLoading ? (
        <PageLoader />
      ) : (
        <CreateTask kids={data.Class.Kids ?? []} />
      )}
    </Layout>
  );
};
