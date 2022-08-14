import React, { useEffect } from 'react';
import { CreateProject } from '../../../components/CreateProject';
import { Layout } from '../../../components/Layout';
import { PageLoader } from '../../../components/UI/PageLoader';
import { useGetUserTeamsQuery } from '../../../redux/GSApi';

export const CreateProjectPage = () => {
  const { data, isLoading } = useGetUserTeamsQuery('');

  useEffect(() => {
    document.title = 'Добавить проект | GS';
  });

  return (
    <Layout>
      {!data || isLoading ? (
        <PageLoader />
      ) : (
        <CreateProject teams={data ?? []} />
      )}
    </Layout>
  );
};
