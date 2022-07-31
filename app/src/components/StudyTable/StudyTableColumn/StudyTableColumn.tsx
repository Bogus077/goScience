import React from 'react';
import classNames from 'classnames/bind';
import styles from './StudyTableColumn.module.scss';
import { POINTS } from '../../../utils/points/points';
import { StudyTableColumnTask } from '../StudyTableColumnTask';
import {
  ActiveTasks,
  Task,
  TaskDay,
  TaskMonth,
  TaskWeek,
} from '../../../models/Tasks/tasks';
const cx = classNames.bind(styles);

type StudyTableColumnTypes = {
  type: 'day' | 'week' | 'month' | 'quarter';
  header: string;
  points: number;
  tasks: TaskDay[] | TaskWeek[] | TaskMonth[] | Task[];
  tasksDays: TaskDay[];
  tasksWeeks: TaskWeek[];
  tasksMonths: TaskMonth[];
  tasksQuarters: Task[];
  activeTasks: ActiveTasks;
  setActiveTasks: React.Dispatch<React.SetStateAction<ActiveTasks>>;
};

export const StudyTableColumn = ({
  type,
  header,
  points,
  tasks,
  activeTasks,
  setActiveTasks,
  tasksDays,
  tasksMonths,
  tasksWeeks,
  tasksQuarters,
}: StudyTableColumnTypes) => {
  return (
    <div
      className={cx('col', {
        col_disabled: points === 0,
        col_warning: points > POINTS.positive && points <= POINTS.warning,
        col_negative: points > POINTS.warning,
      })}
    >
      <div className={styles.col__header}>
        <span>{header}</span>
        <div className={styles.col__points}>{points}</div>
      </div>

      {tasks.map((task) => (
        <StudyTableColumnTask
          type={type}
          key={task.id}
          task={task}
          activeTasks={activeTasks}
          setActiveTasks={setActiveTasks}
          tasksDays={tasksDays}
          tasksWeeks={tasksWeeks}
          tasksMonths={tasksMonths}
          tasksQuarters={tasksQuarters}
        />
      ))}
    </div>
  );
};
