import React, { useEffect } from 'react';
import { Layout } from '../../../components/Layout';
import { MotivationTable } from '../../../components/MotivationTable';
import { PlanPanel } from '../../../components/PlanPanel';
import { PageLoader } from '../../../components/UI/PageLoader';
import { useGetSummaryQuery } from '../../../redux/GSApi';
import styles from './MotivationPage.module.scss';

export const MotivationPage = () => {
  const { data, isLoading } = useGetSummaryQuery('');

  useEffect(() => {
    document.title = 'Мотивация | ККА';
  });

  return isLoading || !data ? (
    <PageLoader />
  ) : (
    <Layout>
      <>
        <PlanPanel />
        <div className={styles.page}>
          <MotivationTable kids={data} />
        </div>
      </>
    </Layout>
  );
};
