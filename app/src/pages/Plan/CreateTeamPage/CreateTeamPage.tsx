import React, { useEffect } from 'react';
import { CreateTeam } from '../../../components/CreateTeam';
import { Layout } from '../../../components/Layout';
import { PageLoader } from '../../../components/UI/PageLoader';
import { useGetCurrentClassQuery } from '../../../redux/GSApi';

export const CreateTeamPage = () => {
  const { data, isLoading } = useGetCurrentClassQuery('');
  useEffect(() => {
    document.title = 'Добавить команду | ККА';
  });

  return (
    <Layout>
      {!data || isLoading ? (
        <PageLoader />
      ) : (
        <CreateTeam kids={data.Class.Kids ?? []} />
      )}
    </Layout>
  );
};
