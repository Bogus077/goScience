import React from 'react';
import { Kid } from '../../../models/Kid/kid';
import {
  Task,
  TaskDay,
  TaskMonth,
  TaskWeek,
} from '../../../models/Tasks/tasks';
import classNames from 'classnames/bind';
import styles from './LinkEvent.module.scss';
const cx = classNames.bind(styles);

type LinkEventTypes = {
  date?: Date;
  dateFinish?: Date;
  type: number;
  kid?: Kid;
  activeLinks: number[];
  setActiveLinks: React.Dispatch<React.SetStateAction<number[]>>;
};

export const LinkEvent = ({
  date,
  dateFinish,
  type,
  kid,
  activeLinks,
  setActiveLinks,
}: LinkEventTypes) => {
  let tasks: Task[] | TaskDay[] | TaskWeek[] | TaskMonth[] = [];
  const handleClick = (id: number) => {
    if (activeLinks.includes(id)) {
      setActiveLinks([]);
    } else {
      setActiveLinks([id]);
    }
  };

  switch (type) {
    case 1:
      tasks =
        (date &&
          kid &&
          kid.TasksWeeks &&
          kid.TasksWeeks.filter((task) => {
            const taskDate = new Date(task.date);
            const taskDateFinish = new Date(taskDate);
            taskDateFinish.setDate(taskDateFinish.getDate() + 7);

            return taskDate <= date && taskDateFinish >= date;
          })) ??
        [];
      break;
    case 2:
      tasks =
        (date &&
          dateFinish &&
          kid &&
          kid.TasksMonths &&
          kid.TasksMonths.filter((task) => {
            const taskDate = new Date(task.date);
            const taskDateFinish = new Date(taskDate);
            taskDateFinish.setDate(taskDateFinish.getDate() + 30);

            return taskDate <= date && taskDateFinish >= date;
          })) ??
        [];
      break;
    case 3:
      tasks =
        (date &&
          dateFinish &&
          kid &&
          kid.TasksQuarters &&
          kid.TasksQuarters.filter((task) => {
            const taskDate = new Date(task.date);
            const taskDateFinish = new Date(taskDate);
            //TODO: fix quarters time (its not 90 days in fact)
            taskDateFinish.setDate(taskDateFinish.getDate() + 90);

            return taskDate <= date && taskDateFinish >= date;
          })) ??
        [];
      break;
  }

  return (
    <div className={styles.links}>
      {tasks.length === 0 ? (
        <div className={styles.links__empty}>
          Нет подходящих событий для связи
        </div>
      ) : (
        tasks.map((task) => (
          <div
            className={cx('task', {
              task_active: activeLinks.includes(task.id),
            })}
            key={task.id}
            onClick={() => handleClick(task.id)}
          >
            {task.label}
          </div>
        ))
      )}
    </div>
  );
};
