import React, { useEffect, useRef, useState } from 'react';
import { POINTS } from '../../../utils/points/points';
import classNames from 'classnames/bind';
import styles from './StudyTableColumnTask.module.scss';
import { TaskDo } from '../../UI/TaskDo';
import {
  ActiveTasks,
  Task,
  TaskDay,
  TaskMonth,
  TaskTypes,
  TaskWeek,
} from '../../../models/Tasks/tasks';
import { getActiveTasks, isActiveTasksEmpty } from '../../../utils/tasks/tasks';
const cx = classNames.bind(styles);

type StudyTableColumnTaskTypes = {
  type: TaskTypes;
  isLate?: boolean;
  isFuture?: boolean;
  task: TaskDay | TaskWeek | TaskMonth | Task;
  tasksDays: TaskDay[];
  tasksWeeks: TaskWeek[];
  tasksMonths: TaskMonth[];
  tasksQuarters: Task[];
  activeTasks: ActiveTasks;
  setActiveTasks: React.Dispatch<React.SetStateAction<ActiveTasks>>;
};

export const StudyTableColumnTask = ({
  type,
  isLate,
  isFuture,
  task,
  tasksDays,
  tasksMonths,
  tasksWeeks,
  tasksQuarters,
  activeTasks,
  setActiveTasks,
}: StudyTableColumnTaskTypes) => {
  const [taskPopup, setTaskPopup] = useState<boolean>(false);
  const taskRef = useRef(document.createElement('div'));

  useEffect(() => {
    //Обрабатываем клик вне компонента
    const onClick = (e: MouseEvent) => {
      if (!taskRef?.current?.contains(e.target as Node)) {
        setTaskPopup(false);
      }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  const handleClick = () => {
    setTaskPopup((prev) => !prev);
    setActiveTasks(
      getActiveTasks(task, tasksDays, tasksWeeks, tasksMonths, tasksQuarters)
    );
  };

  const getDisabledStatus = () => {
    if (isActiveTasksEmpty(activeTasks)) {
      return false;
    } else {
      switch (type) {
        case 'day':
          return !activeTasks.days.includes(task.id);
        case 'week':
          return !activeTasks.weeks.includes(task.id);
        case 'month':
          return !activeTasks.months.includes(task.id);
        case 'quarter':
          return !activeTasks.quarter.includes(task.id);
      }
    }
  };

  return (
    <div
      className={cx('task', {
        task_disabled: getDisabledStatus(),
        task_late: isLate,
      })}
      onClick={handleClick}
      ref={taskRef}
    >
      <span>{task.label}</span>
      <div
        className={cx('task__points', {
          task__points_disabled: task.points === 0,
          task__points_warning:
            task.points > POINTS.positive && task.points <= POINTS.warning,
          task__points_negative: task.points > POINTS.warning,
        })}
      >
        {task.points ?? 0}
      </div>

      <div
        className={cx('task__popup', {
          task__popup_active: taskPopup,
        })}
      >
        <TaskDo id={task.id} type={type} />
      </div>
    </div>
  );
};
