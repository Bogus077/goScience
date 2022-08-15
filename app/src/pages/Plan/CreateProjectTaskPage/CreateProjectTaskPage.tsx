import React, { useEffect } from 'react';
import { CreateProjectTask } from '../../../components/CreateProjectTask';
import { Layout } from '../../../components/Layout';
import { PageLoader } from '../../../components/UI/PageLoader';
import {
  useGetCurrentClassQuery,
  useGetUserProjectsQuery,
  useGetUserTeamsQuery,
} from '../../../redux/GSApi';

export const CreateProjectTaskPage = () => {
  const { data, isLoading } = useGetCurrentClassQuery('');
  const { data: projects, isLoading: isProjectsLoading } =
    useGetUserProjectsQuery('');
  const { data: teams, isLoading: isTeamsLoading } = useGetUserTeamsQuery('');

  useEffect(() => {
    document.title = 'Добавить задачу | GS';
  });

  return (
    <Layout>
      {!data || isLoading || isProjectsLoading || isTeamsLoading ? (
        <PageLoader />
      ) : (
        <CreateProjectTask projects={projects ?? []} teams={teams ?? []} />
      )}
    </Layout>
  );
};
