import { FormikContext, useFormik } from 'formik';
import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Kid } from '../../models/Kid/kid';
import { Project } from '../../models/Project/Project';
import {
  createProjectTaskInitialValues,
  createProjectTaskValidationSchema,
} from '../../models/Validations/validations';
import { useCreateProjectTaskMutation } from '../../redux/GSApi';
import { frontendRoutes } from '../../utils/router/routes';
import { DatePicker } from '../UI/DatePicker';
import { Button } from '../UI/Form/Button';
import { InputText } from '../UI/Form/InputText';
import { KidChooser } from '../UI/KidChooser';
import { Loader } from '../UI/Loader';
import { PointsPicker } from '../UI/PointsPicker';
import { ProjectChooser } from '../UI/ProjectChooser';
import styles from './CreateProjectTask.module.scss';

type CreateTeamTypes = {
  kids: Kid[];
  projects: Project[];
};

export const CreateProjectTask = ({ kids, projects }: CreateTeamTypes) => {
  const navigate = useNavigate();
  const [activeKids, setActiveKids] = useState<number[]>([]);
  const [activeProjects, setActiveProjects] = useState<number[]>([]);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [points, setPoints] = useState<number>(1);

  //TODO обработка ошибок
  const [errors, setErrors] = useState<string[]>([]);

  const [createTask, { isLoading }] = useCreateProjectTaskMutation();

  const handleSubmit = useCallback(
    async (values: typeof createProjectTaskInitialValues) => {
      if (date) {
        const newTask = {
          ...values,
          date: date?.toISOString(),
          points,
          ProjectId: activeProjects[0],
          kids: activeKids,
        };
        const result = await createTask(newTask);
        if ('data' in result) {
          navigate(frontendRoutes.plan.team);
        }
      } else {
        setErrors(['Необходимо выбрать дату окончания задания']);
      }
    },
    [activeKids, activeProjects, createTask, date, navigate, points]
  );

  const formik = useFormik({
    initialValues: createProjectTaskInitialValues,
    validationSchema: createProjectTaskValidationSchema,
    onSubmit: handleSubmit,
  });

  const handleBack = useCallback(() => {
    navigate(frontendRoutes.plan.team);
  }, [navigate]);

  return (
    <FormikContext.Provider value={formik}>
      <div className={styles.form}>
        <div className={styles.form__header}>Новая задача для проекта</div>

        <div className={styles.form__links}>
          <ProjectChooser
            projects={projects}
            active={activeProjects}
            setActive={setActiveProjects}
            type="single"
          />
        </div>

        {activeProjects.length > 0 && (
          <>
            <div className={styles.form__content}>
              <InputText name="label" placeholder="Задача" label="Название" />
              <InputText
                name="description"
                placeholder="Описание задачи"
                label="Описание"
              />
            </div>
            <div className={styles.form__links}>
              <KidChooser
                kids={kids}
                active={activeKids}
                setActive={setActiveKids}
                type="multiple"
              />
            </div>

            <div className={styles.form__content}>
              <DatePicker date={date} dateFinish={date} setDate={setDate} />
            </div>

            <div className={styles.form__links}>
              <PointsPicker points={points} setPoints={setPoints} />
            </div>
          </>
        )}

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
            {activeProjects.length > 0 && (
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
