import React, { useEffect } from 'react';
import { Layout } from '../../../components/Layout';
import { PlanPanel } from '../../../components/PlanPanel';
import { Teams } from '../../../components/Teams';
import { PageLoader } from '../../../components/UI/PageLoader';
import { useGetUserTeamsQuery } from '../../../redux/GSApi';
import styles from './TeamPage.module.scss';

export const TeamPage = () => {
  const { data, isLoading } = useGetUserTeamsQuery('');

  useEffect(() => {
    document.title = 'Коллектив | GS';
  });

  return (
    <Layout>
      {isLoading ? (
        <PageLoader />
      ) : (
        <>
          <PlanPanel />
          <div className={styles.plan__team}>
            <Teams teams={data ?? []} />
          </div>
        </>
      )}
    </Layout>
  );
};
