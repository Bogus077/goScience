import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../../../components/Layout';
import { PlanPanel } from '../../../components/PlanPanel';
import { StudyTable } from '../../../components/StudyTable';
import { AddBanner } from '../../../components/UI/AddBanner';
import { PageLoader } from '../../../components/UI/PageLoader';
import {
  useGetCurrentClassQuery,
  useGetHelpAdviceQuery,
} from '../../../redux/GSApi';
import { frontendRoutes } from '../../../utils/router/routes';
import styles from './Study.module.scss';

export const StudyPage = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetCurrentClassQuery('');
  // TODO: Подключить нейронку
  // const { data: advice, isLoading: isAdviceLoading } = useGetHelpAdviceQuery();
  // console.log(advice);

  useEffect(() => {
    document.title = 'Учеба | ККА';
  });

  const handleAddTask = useCallback(() => {
    navigate(frontendRoutes.tasks.add);
  }, [navigate]);

  return (
    <Layout>
      {isLoading ? (
        <PageLoader />
      ) : (
        <>
          <PlanPanel />
          <div className={styles.plan__study}>
            <AddBanner label="Добавить задачу" onClick={handleAddTask} />
            <StudyTable kids={data?.Class.Kids ?? []} />
          </div>
        </>
      )}
    </Layout>
  );
};
