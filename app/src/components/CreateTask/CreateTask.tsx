import { FormikContext, useFormik } from 'formik';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Kid } from '../../models/Kid/kid';
import {
  createTaskInitialValues,
  createTaskValidationSchema,
} from '../../models/Validations/validations';
import {
  useCreateDayTaskMutation,
  useCreateMonthTaskMutation,
  useCreateQuarterTaskMutation,
  useCreateWeekTaskMutation,
} from '../../redux/GSApi';
import { frontendRoutes } from '../../utils/router/routes';
import { ConfirmModal } from '../UI/ConfirmModal';
import { DatePicker } from '../UI/DatePicker';
import { Button } from '../UI/Form/Button';
import { InputText } from '../UI/Form/InputText';
import { KidChooser } from '../UI/KidChooser';
import { Loader } from '../UI/Loader';
import { PointsPicker } from '../UI/PointsPicker';
import { SwitchBar } from '../UI/SwitchBar';
import styles from './CreateTask.module.scss';
import { LinkEvent } from './LinkEvent';

type LastTask = {
  type: number;
  KidId: number[];
  links: number[];
  points: number;
  date: Date;
  label: string;
  description: string;
};
type CreateTaskTypes = {
  kids: Kid[];
};

export const CreateTask = ({ kids }: CreateTaskTypes) => {
  const navigate = useNavigate();

  const [type, setType] = useState<number>(1);
  const [activeKids, setActiveKids] = useState<number[]>([]);
  const [activeLinks, setActiveLinks] = useState<number[]>([]);
  const [points, setPoints] = useState<number>(1);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [errors, setErrors] = useState<string[]>([]);

  const [createDayTask, { isLoading: isDayTaskCreating }] =
    useCreateDayTaskMutation();
  const [createWeekTask, { isLoading: isWeekTaskCreating }] =
    useCreateWeekTaskMutation();
  const [createMonthTask, { isLoading: isMonthTaskCreating }] =
    useCreateMonthTaskMutation();
  const [createQuarterTask, { isLoading: isQuarterTaskCreating }] =
    useCreateQuarterTaskMutation();

  const lastTasksJson = localStorage.getItem('lastTasks');
  const lastTasks: LastTask[] | null = lastTasksJson
    ? JSON.parse(lastTasksJson)
    : null;

  useEffect(() => {
    setActiveLinks([]);
  }, [type]);

  const isLoading =
    isDayTaskCreating ||
    isWeekTaskCreating ||
    isMonthTaskCreating ||
    isQuarterTaskCreating;

  const handleSubmit = useCallback(
    async (values: typeof createTaskInitialValues) => {
      setErrors([]);

      if (!activeKids[0]) {
        setErrors(['Выберите ученика, которому необходимо добавить задачу']);
        return;
      }

      if (!date) {
        setErrors(['Выберите дату']);
        return;
      }

      date.setHours(0);
      date.setMinutes(0);
      date.setSeconds(0);

      const newTask = {
        KidId: activeKids,
        label: values.label,
        description: values.description,
        date: date.toISOString(),
        status: false,
      };

      localStorage.setItem(
        'lastTasks',
        JSON.stringify([
          { ...newTask, type, date, points, links: activeLinks },
          ...(lastTasks?.slice(0, 4) ?? []),
        ])
      );

      //Если день:
      if (type === 1) {
        const newDayTask = activeLinks[0]
          ? { ...newTask, TasksWeekId: activeLinks[0], points }
          : { ...newTask, points };

        const result = await createDayTask(newDayTask);
        if ('data' in result) {
          if (result.data.errors && result.data.errors.length > 0) {
            setErrors(result.data.errors);
          } else {
            navigate(frontendRoutes.plan.study);
          }
        }
      }

      //Если неделя:
      if (type === 2) {
        const newWeekTask = activeLinks[0]
          ? { ...newTask, TasksMonthId: activeLinks[0] }
          : newTask;

        const result = await createWeekTask(newWeekTask);
        if ('data' in result) {
          if (result.data.errors && result.data.errors.length > 0) {
            setErrors(result.data.errors);
          } else {
            navigate(frontendRoutes.plan.study);
          }
        }
      }

      //Если месяц:
      if (type === 3) {
        const newMonthTask = activeLinks[0]
          ? { ...newTask, TasksQuarterId: activeLinks[0] }
          : newTask;

        const result = await createMonthTask(newMonthTask);
        if ('data' in result) {
          if (result.data.errors && result.data.errors.length > 0) {
            setErrors(result.data.errors);
          } else {
            navigate(frontendRoutes.plan.study);
          }
        }
      }

      //Если четверть:
      if (type === 4) {
        const result = await createQuarterTask(newTask);
        if ('data' in result) {
          if (result.data.errors && result.data.errors.length > 0) {
            setErrors(result.data.errors);
          } else {
            navigate(frontendRoutes.plan.study);
          }
        }
      }
    },
    [
      activeKids,
      activeLinks,
      createDayTask,
      createMonthTask,
      createQuarterTask,
      createWeekTask,
      date,
      navigate,
      points,
      type,
    ]
  );

  const handleBack = useCallback(() => {
    navigate(frontendRoutes.plan.study);
  }, [navigate]);

  const formik = useFormik({
    initialValues: createTaskInitialValues,
    validationSchema: createTaskValidationSchema,
    onSubmit: handleSubmit,
  });

  const taskTypes = [
    { label: 'День', active: type === 1, id: 1 },
    { label: 'Неделя', active: type === 2, id: 2 },
    { label: 'Месяц', active: type === 3, id: 3 },
    { label: 'Четверть', active: type === 4, id: 4 },
  ];

  const applyLastTask = (lastTask: LastTask) => {
    if (lastTask) {
      setType(lastTask.type);
      setActiveKids(lastTask.KidId);
      setActiveLinks(lastTask.links);
      setPoints(lastTask.points);
      setDate(new Date(lastTask.date));
      formik.setValues({
        label: lastTask.label,
        description: lastTask.description,
      });
    }
  };

  const getDateFinish = useCallback(() => {
    if (!date) return undefined;
    const dateFinish = new Date(date.toDateString());

    switch (type) {
      case 1:
        return date;
      case 2:
        dateFinish.setDate(dateFinish.getDate() + 7);
        return dateFinish;
      case 3:
        dateFinish.setDate(dateFinish.getDate() + 30);
        return dateFinish;
      case 4:
        //TODO: fix quarter time (its not 90 days in fact)
        dateFinish.setDate(dateFinish.getDate() + 90);
        return dateFinish;
    }
  }, [date, type]);

  return (
    <FormikContext.Provider value={formik}>
      <div className={styles.form}>
        <div className={styles.form__header}>Новое задание</div>

        {lastTasks && (
          <div className={styles.lastTasks__wrapper}>
            {lastTasks.map((lastTask) => (
              <Button
                type="regular"
                onClick={() => applyLastTask(lastTask)}
                label={lastTask.label}
              />
            ))}
          </div>
        )}

        <div className={styles.form__content}>
          <SwitchBar items={taskTypes} handleChangeActive={setType} />
          <KidChooser
            kids={kids}
            active={activeKids}
            setActive={setActiveKids}
            type="multiple"
          />
          {activeKids.length > 0 && (
            <>
              <InputText
                name="label"
                placeholder="Выучить таблицу"
                label="Название"
              />
              <InputText
                name="description"
                placeholder="Доучить последний ст"
                label="Описание"
              />
            </>
          )}
        </div>

        {activeKids.length > 0 && (
          <div className={styles.form__content}>
            <DatePicker
              date={date}
              dateFinish={getDateFinish()}
              setDate={setDate}
            />
          </div>
        )}

        {activeKids.length > 0 && (
          <div className={styles.form__links}>
            <LinkEvent
              date={date}
              dateFinish={getDateFinish()}
              type={type}
              kid={kids.find((kid) => kid.id === activeKids[0])}
              activeLinks={activeLinks}
              setActiveLinks={setActiveLinks}
            />
          </div>
        )}

        {activeKids.length > 0 && type === 1 && (
          <div className={styles.form__links}>
            <PointsPicker points={points} setPoints={setPoints} />
          </div>
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
      <ConfirmModal
        isOpen={errors.length > 0}
        titleText="Ошибки в процессе добавления"
        message={errors.join('\n\n')}
        acceptText="Понятно"
        rejectText=""
        onAccept={() => navigate(frontendRoutes.plan.study)}
        onReject={() => navigate(frontendRoutes.plan.study)}
        type="positive"
      />
    </FormikContext.Provider>
  );
};
