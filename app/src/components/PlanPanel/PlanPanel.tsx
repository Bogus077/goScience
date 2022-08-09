import React from 'react';
import { ActivityBar } from '../ActivityBar';
import styles from './PlanPanel.module.scss';
import { PlanPanelMenu } from './PlanPanelMenu';

export const PlanPanel = () => {
  return (
    <div className={styles.plan}>
      <div className={styles.plan__nav}>
        <ActivityBar />
        <PlanPanelMenu />
      </div>
    </div>
  );
};
