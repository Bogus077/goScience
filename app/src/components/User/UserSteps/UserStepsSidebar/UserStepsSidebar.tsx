import React from 'react';
import { UserStep } from '../../../../models/User/steps';
import { SidebarStep } from './SidebarStep';
import styles from './UserStepsSidebar.module.scss';

type UserStepsSidebarTypes = {
  steps: UserStep[];
  currentStep: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
};

export const UserStepsSidebar = ({
  steps,
  currentStep,
  setStep,
}: UserStepsSidebarTypes) => {
  return (
    <div className={styles.sidebar}>
      {steps.map((step, key) => (
        <SidebarStep
          key={key}
          step={step}
          steps={steps}
          stepNumber={key}
          currentStep={currentStep}
          setStep={setStep}
        />
      ))}
    </div>
  );
};
