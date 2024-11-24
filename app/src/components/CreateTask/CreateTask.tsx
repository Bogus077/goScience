import { FieldArray, FormikContext, useFormik } from 'formik';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Kid } from '../../models/Kid/kid';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  createTaskInitialValues,
  createTaskValidationSchema,
} from '../../models/Validations/validations';
import {
  useCreateDayTaskMutation,
  useCreateDayTaskWithoutCacheMutation,
  useCreateMonthTaskMutation,
  useCreateQuarterTaskMutation,
  useCreateWeekTaskMutation,
  useGetCurrentClassQuery,
  useLazyGetCurrentClassQuery,
} from '../../redux/GSApi';
import { frontendRoutes } from '../../utils/router/routes';
import { ConfirmModal } from '../UI/ConfirmModal';
import { DatePicker } from '../UI/DatePicker';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker';
import { Button } from '../UI/Form/Button';
import { InputText } from '../UI/Form/InputText';
import { KidChooser } from '../UI/KidChooser';
import { Loader } from '../UI/Loader';
import { PointsPicker } from '../UI/PointsPicker';
import { SwitchBar } from '../UI/SwitchBar';
import styles from './CreateTask.module.scss';
import { LinkEvent } from './LinkEvent';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  ButtonGroup,
  IconButton,
  Button as MuiButton,
  TextField,
  Tooltip,
} from '@mui/material';
import { IconRepeatOnce, IconTrashX } from '@tabler/icons';

type LastTask = {
  type: number;
  KidId: number[];
  links: number[];
  points: number;
  date: Date;
  label: string;
  description: string;
  repeatedTasks: RepeatedTask[];
};
type CreateTaskTypes = {
  kids: Kid[];
};

type RepeatedTask = {
  label: string;
  date: Date;
};

export const CreateTask = ({ kids }: CreateTaskTypes) => {
  const navigate = useNavigate();

  const [type, setType] = useState<number>(1);
  const [activeKids, setActiveKids] = useState<number[]>([]);
  const [activeLinks, setActiveLinks] = useState<number[]>([]);
  const [points, setPoints] = useState<number>(1);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [errors, setErrors] = useState<string[]>([]);
  const [repeatedTaskExpanded, setRepeatedTaskExpanded] =
    useState<boolean>(false);
  const [triggerGetCurrenClass, getCurrentClassQueryState] =
    useLazyGetCurrentClassQuery();

  const [createDayTask, { isLoading: isDayTaskCreating }] =
    useCreateDayTaskWithoutCacheMutation();
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
    isQuarterTaskCreating ||
    getCurrentClassQueryState.isLoading ||
    getCurrentClassQueryState.isFetching;

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
          {
            ...newTask,
            type,
            date,
            points,
            links: activeLinks,
            repeatedTasks: values.tasks,
          },
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
            if (values.tasks.length > 0) {
              const requests = values.tasks.map(async (task) => {
                const newDayTask = activeLinks[0]
                  ? {
                      ...newTask,
                      TasksWeekId: activeLinks[0],
                      points,
                      label: task.label,
                      date: task.date as unknown as string,
                    }
                  : {
                      ...newTask,
                      points,
                      label: task.label,
                      date: task.date as unknown as string,
                    };

                const result = await createDayTask(newDayTask);
                if ('data' in result) {
                  if (result.data.errors && result.data.errors.length > 0) {
                    setErrors(result.data.errors);
                  }
                }
              });

              await Promise.all(requests);

              const result = await triggerGetCurrenClass('').unwrap();
              console.log(result);
              if (result) {
                navigate(frontendRoutes.plan.study);
              }
            } else {
              await triggerGetCurrenClass('').unwrap();
              navigate(frontendRoutes.plan.study);
            }
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
        tasks: lastTask.repeatedTasks,
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

  const handleAddRepeatedTask = () => {
    const task = formik.values;
    const repeatedTasks = formik.values.tasks;
    const taskDate =
      repeatedTasks.length > 0
        ? new Date(repeatedTasks[repeatedTasks.length - 1].date)
        : new Date(date ?? '');
    taskDate.setDate(taskDate.getDate() + 1);
    taskDate.setHours(0);
    taskDate.setMinutes(0);
    taskDate.setSeconds(0);

    const weekDays = [
      'в воскресенье',
      'в понедельник',
      'во вторник',
      'в среду',
      'в четверг',
      'в пятницу',
      'в субботу',
    ];
    const taskLabel = `${task.label} ${weekDays[taskDate.getDay()]}`;

    return { label: taskLabel, date: taskDate };
  };

  return (
    <FormikContext.Provider value={formik}>
      <div className={styles.form}>
        <div className={styles.form__header}>Новое задание</div>

        {lastTasks && (
          <div className={styles.lastTasks__wrapper}>
            <ButtonGroup
              variant="text"
              aria-label="Выбрать из предыдущих задач"
              color="inherit"
            >
              {lastTasks.map((lastTask) => (
                <MuiButton
                  onClick={() => applyLastTask(lastTask)}
                  key={lastTask.date.toString()}
                >
                  {lastTask.label}
                </MuiButton>
              ))}
            </ButtonGroup>
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

              {type === 1 && (
                <Accordion
                  expanded={repeatedTaskExpanded}
                  onChange={() => setRepeatedTaskExpanded((prev) => !prev)}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    Повторяющиеся задания
                  </AccordionSummary>
                  <AccordionDetails>
                    <FieldArray
                      name="tasks"
                      render={(arrayHelpers) => (
                        <div className={styles.repeatedTasksList}>
                          {formik.values.tasks.map((task, index) => (
                            <div className={styles.repeatedTask} key={index}>
                              <InputText
                                name={`tasks.${index}.label`}
                                placeholder="Выучить таблицу"
                                label="Название"
                              />
                              <div>
                                <MuiDatePicker
                                  label="Дата"
                                  value={formik.values.tasks[index].date}
                                  onChange={(newValue) => {
                                    formik.setFieldValue(
                                      `tasks.${index}.date`,
                                      newValue
                                    );
                                  }}
                                  renderInput={(params) => (
                                    <TextField {...params} fullWidth />
                                  )}
                                />
                              </div>
                              <div>
                                <IconButton
                                  onClick={() => arrayHelpers.remove(index)}
                                  disabled={!date || !formik.values.label}
                                >
                                  <IconTrashX />
                                </IconButton>
                              </div>
                            </div>
                          ))}
                          <div>
                            <MuiButton
                              onClick={() =>
                                arrayHelpers.push(handleAddRepeatedTask())
                              }
                              disabled={!date || !formik.values.label}
                            >
                              Добавить повторяющееся задание
                            </MuiButton>
                          </div>
                        </div>
                      )}
                    />
                  </AccordionDetails>
                </Accordion>
              )}
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
