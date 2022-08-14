import { FormikContext, useFormik } from 'formik';
import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Project } from '../../models/Project/Project';
import { Team } from '../../models/Teams/teams';
import {
  createProjectInitialValues,
  createProjectValidationSchema,
} from '../../models/Validations/validations';
import { useUpdateProjectMutation } from '../../redux/GSApi';
import { frontendRoutes } from '../../utils/router/routes';
import { Button } from '../UI/Form/Button';
import { InputText } from '../UI/Form/InputText';
import { Loader } from '../UI/Loader';
import { TeamChooser } from '../UI/TeamChooser';
import styles from './UpdateProject.module.scss';

type CreateTeamTypes = {
  teams: Team[];
  project: Project;
};

export const UpdateProject = ({ teams, project }: CreateTeamTypes) => {
  const navigate = useNavigate();
  const [activeTeam, setActiveTeam] = useState<number[]>([project.TeamId]);
  //TODO обработка ошибок
  const [errors, setErrors] = useState<string[]>([]);

  const [updateProject, { isLoading }] = useUpdateProjectMutation();

  const handleSubmit = useCallback(
    async (values: typeof createProjectInitialValues) => {
      const newProject = {
        ...values,
        TeamId: activeTeam[0],
        ProjectId: project.id,
      };
      const result = await updateProject(newProject);
      if ('data' in result) {
        navigate(frontendRoutes.plan.team);
      }
    },
    [activeTeam, navigate, project.id, updateProject]
  );

  const formik = useFormik({
    initialValues: { ...createProjectInitialValues, label: project.label },
    validationSchema: createProjectValidationSchema,
    onSubmit: handleSubmit,
  });

  const handleBack = useCallback(() => {
    navigate(frontendRoutes.plan.team);
  }, [navigate]);

  return (
    <FormikContext.Provider value={formik}>
      <div className={styles.form}>
        <div className={styles.form__header}>Изменить проект</div>

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
