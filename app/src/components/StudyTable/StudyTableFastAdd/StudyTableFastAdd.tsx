import React, { useCallback, useState } from 'react';
import styles from './StudyTableFastAdd.module.scss';
import { Kid } from '../../../models/Kid/kid';
import { useCreateDayTaskMutation } from '../../../redux/GSApi';
import { FormikContext, useFormik } from 'formik';
import {
  createFastTaskInitialValues,
  createFastTaskValidationSchema,
} from '../../../models/Validations/validations';
import { tr } from 'date-fns/locale';
import { InputText } from '../../UI/Form/InputText';
import { IconCheck } from '../../UI/Icons/Forms/IconCheck';
import { IconCross } from '../../UI/Icons/Forms/IconCross';
import { IconSquarePlus } from '@tabler/icons';
import Skeleton from '@mui/material/Skeleton';

type StudyTableFastAddTypes = {
  kid: Kid;
};

export const StudyTableFastAdd = ({ kid }: StudyTableFastAddTypes) => {
  const [isEditable, setEditable] = useState(false);

  const [createDayTask, { isLoading: isDayTaskCreating }] =
    useCreateDayTaskMutation();

  const handleSubmit = useCallback(
    async (values: typeof createFastTaskInitialValues) => {
      if (!kid.id) return;

      const date = new Date();
      date.setDate(date.getDate() + 1);
      date.setHours(0);
      date.setMinutes(0);
      date.setSeconds(0);

      const newTask = {
        KidId: [kid.id],
        label: values.label,
        description: '',
        date: date.toISOString(),
        status: false,
        points: 1,
      };

      try {
        await createDayTask(newTask).unwrap();

        formik.resetForm();
        setEditable(false);
      } catch (error) {
        console.log(error);
      }
    },
    []
  );

  const formik = useFormik({
    initialValues: createFastTaskInitialValues,
    validationSchema: createFastTaskValidationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <FormikContext.Provider value={formik}>
      {isEditable ? (
        isDayTaskCreating ? (
          <div className={styles.skeleton}>
            <Skeleton />
          </div>
        ) : (
          <div className={styles.fastAdd}>
            <InputText name="label" placeholder="Новая задача" />
            <div className={styles.button} onClick={() => formik.submitForm()}>
              <IconCheck
                disabled={Boolean(
                  !formik.isValid || formik.values.label === ''
                )}
              />
            </div>
            <div className={styles.button} onClick={() => setEditable(false)}>
              <IconCross />
            </div>
          </div>
        )
      ) : (
        <div className={styles.edit} onClick={() => setEditable(true)}>
          <IconSquarePlus />
        </div>
      )}
    </FormikContext.Provider>
  );
};
