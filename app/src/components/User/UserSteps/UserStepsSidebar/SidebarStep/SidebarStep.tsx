import React from 'react';
import { UserStep } from '../../../../../models/User/steps';
import classNames from 'classnames/bind';
import styles from './SidebarStep.module.scss';
const cx = classNames.bind(styles);

type SidebarStepTypes = {
  step: UserStep;
  steps: UserStep[];
  stepNumber: number;
  currentStep: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
};

export const SidebarStep = ({
  step,
  steps,
  stepNumber,
  currentStep,
  setStep,
}: SidebarStepTypes) => {
  const isAvailable = () => {
    const prevSteps = steps.filter((s, i) => i < stepNumber);
    const undoneSteps = prevSteps.filter(
      (s) => s.buttons.nextButton.available === false
    );
    return undoneSteps.length === 0;
  };

  return (
    <div
      className={cx('step', {
        step_current: stepNumber === currentStep,
        step_prev: stepNumber < currentStep,
      })}
      onClick={() => {
        if (isAvailable()) setStep(stepNumber);
      }}
    >
      <div className={styles.step__number}>{stepNumber + 1}</div>
      <div className={styles.step__label}>{step.title}</div>
    </div>
  );
};
