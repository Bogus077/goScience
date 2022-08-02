import React, { useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGetCurrentClassQuery } from '../../redux/GSApi';
import { frontendRoutes } from '../../utils/router/routes';
import { ActivityBar } from '../ActivityBar';
import { StudyTable } from '../StudyTable';
import { AddBanner } from '../UI/AddBanner';
import { PageLoader } from '../UI/PageLoader';
import styles from './PlanPanel.module.scss';
import { PlanPanelMenu } from './PlanPanelMenu';

export const PlanPanel = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { data, isLoading } = useGetCurrentClassQuery('');

  useEffect(() => {
    document.title = 'Планирование | GS';
  });

  //TODO: Cut out to backend settings
  const normative = 20;
  const fact = 12;

  const handleAddTask = useCallback(() => {
    navigate(frontendRoutes.tasks.add);
  }, [navigate]);

  const getMainComponent = useCallback(() => {
    switch (location.pathname) {
      case frontendRoutes.plan.study:
        return (
          <div className={styles.plan__study}>
            <AddBanner label="Добавить задачу" onClick={handleAddTask} />
            <StudyTable kids={data?.Class.Kids ?? []} />
          </div>
        );
      case frontendRoutes.plan.motivation:
        return <>Motivation</>;
      case frontendRoutes.plan.discipline:
        return <>Discipline</>;
      case frontendRoutes.plan.team:
        return <>Team</>;
    }
  }, [data?.Class.Kids, handleAddTask, location.pathname]);

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
