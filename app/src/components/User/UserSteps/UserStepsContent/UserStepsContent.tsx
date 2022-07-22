import React, { ReactElement } from 'react';
import { UserStep } from '../../../../models/User/steps';
import styles from './UserStepsContent.module.scss';
import { UserStepsContentItem } from './UserStepsContentItem';

type UserStepsContentTypes = {
  children: ReactElement[];
  steps: UserStep[];
  currentStep: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
};

export const UserStepsContent = ({
  children,
  steps,
  currentStep,
  setStep,
}: UserStepsContentTypes) => {
  return (
    <div className={styles.content}>
      <UserStepsContentItem step={steps[currentStep]} setStep={setStep}>
        {children[currentStep]}
      </UserStepsContentItem>
    </div>
  );
};
