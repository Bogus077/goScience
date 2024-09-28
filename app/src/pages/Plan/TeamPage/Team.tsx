import React, { useEffect } from 'react';
import { Layout } from '../../../components/Layout';
import { PlanPanel } from '../../../components/PlanPanel';
import { ProjectsTable } from '../../../components/ProjectsTable';
import { Teams } from '../../../components/Teams';
import { PageLoader } from '../../../components/UI/PageLoader';
import {
  useGetUserProjectsQuery,
  useGetUserTeamsQuery,
} from '../../../redux/GSApi';
import styles from './TeamPage.module.scss';

export const TeamPage = () => {
  const { data, isLoading } = useGetUserTeamsQuery('');
  const { data: projects, isLoading: isProjectsLoading } =
    useGetUserProjectsQuery('');

  useEffect(() => {
    document.title = 'Коллектив | ККА';
  });

  return (
    <Layout>
      {isLoading || isProjectsLoading ? (
        <PageLoader />
      ) : (
        <>
          <PlanPanel />
          <div className={styles.plan__team}>
            <Teams teams={data ?? []} />
          </div>
          <div className={styles.plan__projects}>
            <ProjectsTable projects={projects ?? []} />
          </div>
        </>
      )}
    </Layout>
  );
};
