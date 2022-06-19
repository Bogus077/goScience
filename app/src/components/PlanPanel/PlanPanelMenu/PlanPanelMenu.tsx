import React from 'react';
import styles from './PlanPanelMenu.module.scss';
import { PlanPanelMenuItem } from './PlanPanelMenuItem';

export const PlanPanelMenu = () => {
  return (
    <div className={styles.menu}>
      <PlanPanelMenuItem title="study" active />
      <PlanPanelMenuItem title="motivation" />
      <PlanPanelMenuItem title="discipline" />
      <PlanPanelMenuItem title="collective" />
    </div>
  );
};
