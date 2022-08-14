import React, { useEffect } from 'react';
import { CreateProjectTask } from '../../../components/CreateProjectTask';
import { Layout } from '../../../components/Layout';
import { PageLoader } from '../../../components/UI/PageLoader';
import {
  useGetCurrentClassQuery,
  useGetUserProjectsQuery,
} from '../../../redux/GSApi';

export const CreateProjectTaskPage = () => {
  const { data, isLoading } = useGetCurrentClassQuery('');
  const { data: projects, isLoading: isProjectsLoading } =
    useGetUserProjectsQuery('');

  useEffect(() => {
    document.title = 'Добавить задачу | GS';
  });

  return (
    <Layout>
      {!data || isLoading || isProjectsLoading ? (
        <PageLoader />
      ) : (
        <CreateProjectTask
          kids={data.Class.Kids ?? []}
          projects={projects ?? []}
        />
      )}
    </Layout>
  );
};
