import React, { useState } from 'react';
import styles from './MotivationCreateSummary.module.scss';
import { useCreateSummaryMutation } from '../../../redux/GSApi';
import { FormikContext, useFormik } from 'formik';
import {
  createSummaryInitialValues,
  createSummaryValidationSchema,
} from '../../../models/Validations/validations';
import { InputText } from '../../UI/Form/InputText';
import { IconCheck } from '../../UI/Icons/Forms/IconCheck';
import classNames from 'classnames/bind';
import { IconCross } from '../../UI/Icons/Forms/IconCross';

const cx = classNames.bind(styles);

type MotivationCreateSummaryProps = {
  kidId: number;
  type: 'day' | 'week';
};

export function MotivationCreateSummary({
  kidId,
  type,
}: MotivationCreateSummaryProps) {
  const [isEditable, setIsEditable] = useState(false);

  const [createSummary, { isLoading, isError, error }] =
    useCreateSummaryMutation();

  const handleCreateSummary = async (
    values: typeof createSummaryInitialValues
  ) => {
    if (isLoading) {
      return;
    }

    try {
      await createSummary({
        KidId: kidId,
        label: values.label,
        type,
      }).unwrap();
      setIsEditable(false);
    } catch (e) {
      console.log(e);
    }
  };

  const formik = useFormik({
    initialValues: createSummaryInitialValues,
    validationSchema: createSummaryValidationSchema,
    onSubmit: handleCreateSummary,
  });

  return (
    <div>
      {isEditable ? (
        <FormikContext.Provider value={formik}>
          <div className={styles.form}>
            <InputText name="label" placeholder="Добавить..." label="" />
            <div
              className={cx('form__submit', {
                form__submit_disabled:
                  !formik.isValid || formik.values.label === '',
              })}
              onClick={() => formik.handleSubmit()}
            >
              <IconCheck />
              <span>Сохранить</span>
            </div>
            <div
              className={styles.form__submit}
              onClick={() => setIsEditable(false)}
            >
              <IconCross />
              <span className={styles.col__do}>Отменить</span>
            </div>
          </div>
        </FormikContext.Provider>
      ) : (
        <div className={styles.edit} onClick={() => setIsEditable(true)}>
          Добавить...
        </div>
      )}
    </div>
  );
}
