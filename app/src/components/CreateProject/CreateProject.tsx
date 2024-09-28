import { FormikContext, useFormik } from 'formik';
import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Team } from '../../models/Teams/teams';
import {
  createProjectInitialValues,
  createProjectValidationSchema,
} from '../../models/Validations/validations';
import { useCreateProjectMutation } from '../../redux/GSApi';
import { frontendRoutes } from '../../utils/router/routes';
import { Button } from '../UI/Form/Button';
import { InputText } from '../UI/Form/InputText';
import { Loader } from '../UI/Loader';
import { TeamChooser } from '../UI/TeamChooser';
import styles from './CreateProject.module.scss';

type CreateTeamTypes = {
  teams: Team[];
};

export const CreateProject = ({ teams }: CreateTeamTypes) => {
  const navigate = useNavigate();
  const [activeTeam, setActiveTeam] = useState<number[]>([]);
  //TODO обработка ошибок
  const [errors] = useState<string[]>([]);

  const [createProject, { isLoading }] = useCreateProjectMutation();

  const handleSubmit = useCallback(
    async (values: typeof createProjectInitialValues) => {
      const newProject = {
        ...values,
        TeamId: activeTeam[0],
      };
      const result = await createProject(newProject);
      if ('data' in result) {
        navigate(frontendRoutes.plan.team);
      }
    },
    [activeTeam, createProject, navigate]
  );

  const formik = useFormik({
    initialValues: createProjectInitialValues,
    validationSchema: createProjectValidationSchema,
    onSubmit: handleSubmit,
  });

  const handleBack = useCallback(() => {
    navigate(frontendRoutes.plan.team);
  }, [navigate]);

  return (
    <FormikContext.Provider value={formik}>
      <div className={styles.form}>
        <div className={styles.form__header}>Новый проект</div>

        <div className={styles.form__content}>
          <InputText
            name="label"
            placeholder="Проект без названия"
            label="Название проекта"
          />
        </div>
        <div className={styles.form__content}>
          <TeamChooser
            teams={teams}
            active={activeTeam}
            setActive={setActiveTeam}
            type="single"
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
            {activeTeam.length > 0 && (
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
