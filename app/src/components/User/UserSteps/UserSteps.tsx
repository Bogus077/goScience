import React, { ReactElement, useState } from 'react';
import { UserStep } from '../../../models/User/steps';
import styles from './UserSteps.module.scss';
import { UserStepsContent } from './UserStepsContent';
import { UserStepsSidebar } from './UserStepsSidebar';

type UserStepsTypes = {
  children: ReactElement[];
  steps: UserStep[];
};

export const UserSteps = ({ children, steps }: UserStepsTypes) => {
  const [step, setStep] = useState(0);

  return (
    <div className={styles.steps}>
      <UserStepsContent steps={steps} currentStep={step} setStep={setStep}>
        {children}
      </UserStepsContent>
      <div className={styles.sidebar}>
        <UserStepsSidebar steps={steps} currentStep={step} setStep={setStep} />
      </div>
    </div>
  );
};
