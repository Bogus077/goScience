import React from 'react';
import { ActivityBar } from '../ActivityBar';
import styles from './PlanPanel.module.scss';
import { PlanPanelMenu } from './PlanPanelMenu';

export const PlanPanel = () => {
  const normative = 20;
  const fact = 12;

  return (
    <div className={styles.plan}>
      <div className={styles.plan__nav}>
        <ActivityBar normative={normative} fact={fact} />
        <PlanPanelMenu />
      </div>
    </div>
  );
};
