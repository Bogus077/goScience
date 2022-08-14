import { FormikContext, useFormik } from 'formik';
import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Kid } from '../../models/Kid/kid';
import { GetProjectTaskResponse, Project } from '../../models/Project/Project';
import {
  createProjectTaskInitialValues,
  createProjectTaskValidationSchema,
} from '../../models/Validations/validations';
import { useUpdateProjectTaskMutation } from '../../redux/GSApi';
import { frontendRoutes } from '../../utils/router/routes';
import { DatePicker } from '../UI/DatePicker';
import { Button } from '../UI/Form/Button';
import { InputText } from '../UI/Form/InputText';
import { KidChooser } from '../UI/KidChooser';
import { Loader } from '../UI/Loader';
import { PointsPicker } from '../UI/PointsPicker';
import { ProjectChooser } from '../UI/ProjectChooser';
import styles from './UpdateProjectTask.module.scss';

type UpdateProjectTaskTypes = {
  kids: Kid[];
  task: GetProjectTaskResponse;
  projects: Project[];
};

export const UpdateProjectTask = ({
  kids,
  task,
  projects,
}: UpdateProjectTaskTypes) => {
  const navigate = useNavigate();
  const [activeKids, setActiveKids] = useState<number[]>(
    task.Kids.map((kid) => kid.id ?? 0)
  );
  const [activeProjects, setActiveProjects] = useState<number[]>([
    task.ProjectId,
  ]);
  const [date, setDate] = useState<Date | undefined>(new Date(task.date));
  const [points, setPoints] = useState<number>(task.points);

  //TODO обработка ошибок
  const [errors, setErrors] = useState<string[]>([]);

  const [updateTask, { isLoading }] = useUpdateProjectTaskMutation();

  //TODO: добавить возможность редактировать статус задачи
  const handleSubmit = useCallback(
    async (values: typeof createProjectTaskInitialValues) => {
      if (date) {
        const newTask = {
          ...values,
          date: date?.toISOString(),
          points,
          ProjectId: activeProjects[0],
          kids: activeKids,
          ProjectTaskId: task.id,
        };
        const result = await updateTask(newTask);
        if ('data' in result) {
          navigate(frontendRoutes.plan.team);
        }
      } else {
        setErrors(['Необходимо выбрать дату окончания задания']);
      }
    },
    [activeKids, activeProjects, date, navigate, points, task.id, updateTask]
  );

  const formik = useFormik({
    initialValues: {
      ...createProjectTaskInitialValues,
      label: task.label,
      description: task.description,
    },
    validationSchema: createProjectTaskValidationSchema,
    onSubmit: handleSubmit,
  });

  const handleBack = useCallback(() => {
    navigate(frontendRoutes.plan.team);
  }, [navigate]);

  return (
    <FormikContext.Provider value={formik}>
      <div className={styles.form}>
        <div className={styles.form__header}>Изменить задачу проекта</div>

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
