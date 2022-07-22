import React, { useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { frontendRoutes } from '../../utils/router/routes';
import { ActivityBar } from '../ActivityBar';
import { StudyTable } from '../StudyTable';
import styles from './PlanPanel.module.scss';
import { PlanPanelMenu } from './PlanPanelMenu';

export const PlanPanel = () => {
  const location = useLocation();

  //TODO: Cut out to backend settings
  const normative = 20;
  const fact = 12;

  const getMainComponent = useCallback(() => {
    switch (location.pathname) {
      case frontendRoutes.plan.study:
        return <StudyTable />;
      case frontendRoutes.plan.motivation:
        return <>Motivation</>;
      case frontendRoutes.plan.discipline:
        return <>Discipline</>;
      case frontendRoutes.plan.team:
        return <>Team</>;
    }
  }, [location.pathname]);

  return (
    <div className={styles.plan}>
      <div className={styles.plan__nav}>
        <ActivityBar normative={normative} fact={fact} />
        <PlanPanelMenu />
      </div>
      <div className={styles.plan__main}>{getMainComponent()}</div>
    </div>
  );
};
