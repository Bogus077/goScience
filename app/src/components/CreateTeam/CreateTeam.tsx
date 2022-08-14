import { FormikContext, useFormik } from 'formik';
import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Kid } from '../../models/Kid/kid';
import {
  createTeamInitialValues,
  createTeamValidationSchema,
} from '../../models/Validations/validations';
import { useCreateTeamMutation } from '../../redux/GSApi';
import { frontendRoutes } from '../../utils/router/routes';
import { Button } from '../UI/Form/Button';
import { InputText } from '../UI/Form/InputText';
import { KidChooser } from '../UI/KidChooser';
import { Loader } from '../UI/Loader';
import styles from './CreateTeam.module.scss';

type CreateTeamTypes = {
  kids: Kid[];
};

export const CreateTeam = ({ kids }: CreateTeamTypes) => {
  const navigate = useNavigate();
  const [activeKids, setActiveKids] = useState<number[]>([]);
  //TODO обработка ошибок
  const [errors, setErrors] = useState<string[]>([]);

  const [createTeam, { isLoading }] = useCreateTeamMutation();

  const handleSubmit = useCallback(
    async (values: typeof createTeamInitialValues) => {
      const newTeam = {
        ...values,
        kids: activeKids,
      };
      const result = await createTeam(newTeam);
      if ('data' in result) {
        navigate(frontendRoutes.plan.team);
      }
    },
    [activeKids, createTeam, navigate]
  );

  const formik = useFormik({
    initialValues: createTeamInitialValues,
    validationSchema: createTeamValidationSchema,
    onSubmit: handleSubmit,
  });

  const handleBack = useCallback(() => {
    navigate(frontendRoutes.plan.team);
  }, [navigate]);

  return (
    <FormikContext.Provider value={formik}>
      <div className={styles.form}>
        <div className={styles.form__header}>Новая команда</div>

        <div className={styles.form__content}>
          <InputText
            name="label"
            placeholder="Команда 1"
            label="Название команды"
          />
        </div>
        <div className={styles.form__content}>
          <KidChooser
            kids={kids}
            active={activeKids}
            setActive={setActiveKids}
            type="multiple"
          />
        </div>

        {isLoading ? (
          <Loader />
        ) : (
          <div className={styles.form__navigate}>
            {errors.length > 0 &&
              errors.map((error, key) => (
                <div className={styles.form__error} key={key}>
                  {error}
                </div>
              ))}
            {activeKids.length > 0 && (
              <Button
                type="submit"
                label="Сохранить"
                onClick={formik.handleSubmit}
              />
            )}
            <Button type="warning" label="Отменить" onClick={handleBack} />
          </div>
        )}
      </div>
    </FormikContext.Provider>
  );
};
