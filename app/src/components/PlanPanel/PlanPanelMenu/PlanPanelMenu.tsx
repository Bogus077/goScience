import React from 'react';
import { useLocation } from 'react-router-dom';
import { frontendRoutes } from '../../../utils/router/routes';
import styles from './PlanPanelMenu.module.scss';
import { PlanPanelMenuItem } from './PlanPanelMenuItem';

export const PlanPanelMenu = () => {
  const location = useLocation();

  return (
    <div className={styles.menu}>
      <PlanPanelMenuItem
        title="study"
        active={location.pathname === frontendRoutes.plan.study}
      />
      <PlanPanelMenuItem
        title="motivation"
        active={location.pathname === frontendRoutes.plan.motivation}
      />
      <PlanPanelMenuItem
        title="discipline"
        active={location.pathname === frontendRoutes.plan.discipline}
        disabled
      />
      <PlanPanelMenuItem
        title="collective"
        active={location.pathname === frontendRoutes.plan.team}
      />
    </div>
  );
};
