import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Layout } from '../../../components/Layout';
import { PageLoader } from '../../../components/UI/PageLoader';
import { UpdateProjectTask } from '../../../components/UpdateProjectTask';
import {
  useGetCurrentClassQuery,
  useGetProjectTaskQuery,
  useGetUserProjectsQuery,
} from '../../../redux/GSApi';
import { frontendRoutes } from '../../../utils/router/routes';

export const UpdateProjectTaskPage = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useGetCurrentClassQuery('');
  const { data: projects, isLoading: isProjectsLoading } =
    useGetUserProjectsQuery('');
  const { data: task, isLoading: isTaskLoading } = useGetProjectTaskQuery({
    ProjectTaskId: projectId ?? '1',
  });

  useEffect(() => {
    document.title = 'Изменить задачу проекта | GS';

    if (!projectId || !task) {
      navigate(frontendRoutes.plan.team);
    }
  });

  return (
    <Layout>
      {!data || isLoading || isProjectsLoading || isTaskLoading ? (
        <PageLoader />
      ) : task && projects ? (
        <UpdateProjectTask
          kids={data.Class.Kids ?? []}
          task={task}
          projects={projects}
        />
      ) : (
        <></>
      )}
    </Layout>
  );
};
