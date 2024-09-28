import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Layout } from '../../../components/Layout';
import { PageLoader } from '../../../components/UI/PageLoader';
import { UpdateProject } from '../../../components/UpdateProject';
import {
  useGetUserProjectsQuery,
  useGetUserTeamsQuery,
} from '../../../redux/GSApi';
import { frontendRoutes } from '../../../utils/router/routes';

export const UpdateProjectPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useGetUserTeamsQuery('');
  const { data: projects, isLoading: isProjectsLoading } =
    useGetUserProjectsQuery('');

  const projectId = parseInt(params.projectId ?? '0');
  const project = projects?.find((pr) => pr.id === projectId);

  useEffect(() => {
    document.title = 'Изменить проект | ККА';

    if (!params.projectId || !project) {
      navigate(frontendRoutes.plan.team);
    }
  });

  return (
    <Layout>
      {!data || isLoading || isProjectsLoading ? (
        <PageLoader />
      ) : project ? (
        <UpdateProject teams={data ?? []} project={project} />
      ) : (
        <></>
      )}
    </Layout>
  );
};
