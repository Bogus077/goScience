import React, { ReactElement, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserStep } from '../../../../../models/User/steps';
import { Button } from '../../../../UI/Form/Button';
import styles from './UserStepsContentItem.module.scss';

type UserStepsContentItemTypes = {
  children: ReactElement;
  step: UserStep;
  setStep: React.Dispatch<React.SetStateAction<number>>;
};

export const UserStepsContentItem = ({
  step,
  children,
  setStep,
}: UserStepsContentItemTypes) => {
  const navigate = useNavigate();

  const handleNextStep = useCallback(() => {
    if (step.buttons.nextButton.available && !step.buttons.nextButton.isLoading)
      step.buttons.nextButton.handleClick
        ? step.buttons.nextButton.handleClick()
        : setStep((prevState) => prevState + 1);
  }, [setStep, step.buttons.nextButton]);

  const handlePrevStep = useCallback(() => {
    step.buttons.prevButton.handleClick
      ? step.buttons.prevButton.handleClick()
      : setStep((prevState) => prevState - 1);
  }, [setStep, step.buttons.prevButton]);

  return (
    <div className={styles.content}>
      {step.img && (
        <img className={styles.content__img} src={step.img} alt="login" />
      )}
      <div className={styles.content__header}>
        <span className={styles.content__title}>{step.title}</span>
        {step.link?.title && (
          <div
            className={styles.content__link}
            onClick={() => navigate(step.link?.url ?? '/#')}
          >
            {step.link?.title}
          </div>
        )}
      </div>

      <div className={styles.content__description}>{step.description}</div>

      <div className={styles.content__main}>{children}</div>

      <div className={styles.content__buttons}>
        <Button
          label={step.buttons.nextButton.title}
          type={step.buttons.nextButton.available ? 'regular' : 'inactive'}
          isLoading={step.buttons.nextButton.isLoading}
          onClick={handleNextStep}
        />
        <Button
          label={step.buttons.prevButton.title}
          type="warning"
          onClick={handlePrevStep}
        />
      </div>
    </div>
  );
};
