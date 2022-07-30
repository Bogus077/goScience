import React, { useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useGetCurrentClassQuery } from '../../redux/GSApi';
import { frontendRoutes } from '../../utils/router/routes';
import { ActivityBar } from '../ActivityBar';
import { StudyTable } from '../StudyTable';
import { PageLoader } from '../UI/PageLoader';
import styles from './PlanPanel.module.scss';
import { PlanPanelMenu } from './PlanPanelMenu';

export const PlanPanel = () => {
  const location = useLocation();
  const { data, isLoading } = useGetCurrentClassQuery('');

  useEffect(() => {
    document.title = 'Планирование | GS';
  });

  //TODO: Cut out to backend settings
  const normative = 20;
  const fact = 12;

  const getMainComponent = useCallback(() => {
    switch (location.pathname) {
      case frontendRoutes.plan.study:
        return <StudyTable kids={data?.Class.Kids ?? []} />;
      case frontendRoutes.plan.motivation:
        return <>Motivation</>;
      case frontendRoutes.plan.discipline:
        return <>Discipline</>;
      case frontendRoutes.plan.team:
        return <>Team</>;
    }
  }, [data?.Class.Kids, location.pathname]);

  return !data || isLoading ? (
    <PageLoader />
  ) : (
    <div className={styles.plan}>
      <div className={styles.plan__nav}>
        <ActivityBar normative={normative} fact={fact} />
        <PlanPanelMenu />
      </div>
      <div className={styles.plan__main}>{getMainComponent()}</div>
    </div>
  );
};
