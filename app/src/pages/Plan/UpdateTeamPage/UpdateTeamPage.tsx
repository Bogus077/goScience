import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Layout } from '../../../components/Layout';
import { PageLoader } from '../../../components/UI/PageLoader';
import { UpdateTeam } from '../../../components/UpdateTeam';
import {
  useGetCurrentClassQuery,
  useGetUserTeamsQuery,
} from '../../../redux/GSApi';
import { frontendRoutes } from '../../../utils/router/routes';

export const UpdateTeamPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useGetCurrentClassQuery('');
  const { data: teams, isLoading: isTeamLoading } = useGetUserTeamsQuery('');

  useEffect(() => {
    document.title = 'Изменить команду | GS';
  });

  const teamId = parseInt(params.teamId ?? '0');
  const team = teams?.find((team) => team.id === teamId);
  if (!teamId || !team) {
    navigate(frontendRoutes.plan.team);
  }

  return (
    <Layout>
      {!data || isLoading || isTeamLoading ? (
        <PageLoader />
      ) : team ? (
        <UpdateTeam kids={data.Class.Kids ?? []} team={team} />
      ) : (
        <></>
      )}
    </Layout>
  );
};
