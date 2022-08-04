import React, { useEffect, useRef, useState } from 'react';
import {
  Task as TaskType,
  TaskDay,
  TaskMonth,
  TaskWeek,
} from '../../../models/Tasks/tasks';
import classNames from 'classnames/bind';
import styles from './Task.module.scss';
import { POINTS } from '../../../utils/points/points';
import { TaskDo } from '../TaskDo';
const cx = classNames.bind(styles);

type TaskTypes = {
  task: TaskType | TaskDay | TaskWeek | TaskMonth;
};

export const Task = ({ task }: TaskTypes) => {
  const [taskPopup, setTaskPopup] = useState(false);
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

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.task}
        onClick={() => setTaskPopup(true)}
        ref={taskRef}
      >
        <div
          className={cx('task__points', {
            task__points_disabled: task.points === 0,
            task__points_warning:
              task.points > POINTS.positive && task.points <= POINTS.warning,
            task__points_negative: task.points > POINTS.warning,
          })}
        >
          {task.points}
        </div>
        {task.label}
      </div>
      <div
        className={cx('task__popup', {
          task__popup_active: taskPopup,
        })}
      >
        <TaskDo id={task.id} type="day" />
      </div>
    </div>
  );
};
