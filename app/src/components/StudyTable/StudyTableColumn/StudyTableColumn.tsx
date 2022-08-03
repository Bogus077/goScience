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
  TaskTypes,
  TaskWeek,
} from '../../../models/Tasks/tasks';
import { isActiveTasksEmpty } from '../../../utils/tasks/tasks';
const cx = classNames.bind(styles);

type StudyTableColumnTypes = {
  type: TaskTypes;
  header: string;
  points: number;
  tasks: {
    currentTasks: TaskDay[] | TaskWeek[] | TaskMonth[] | Task[];
    lateTasks: TaskDay[] | TaskWeek[] | TaskMonth[] | Task[];
    futureTasks: TaskDay[] | TaskWeek[] | TaskMonth[] | Task[];
  };
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
  const isNoActiveTasks = isActiveTasksEmpty(activeTasks);

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

      {tasks.currentTasks.map((task) => (
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

      {tasks.lateTasks.length > 0 && (
        <div
          className={cx('col__subheader', {
            col__subheader_hidden: !isNoActiveTasks,
          })}
        >
          Просрочено:
        </div>
      )}
      {tasks.lateTasks.map((task) => (
        <StudyTableColumnTask
          type={type}
          isLate={true}
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

      {tasks.futureTasks.length > 0 && (
        <div
          className={cx('col__subheader', {
            col__subheader_hidden: !isNoActiveTasks,
          })}
        >
          Будущие задачи:
        </div>
      )}
      {tasks.futureTasks.map((task) => (
        <StudyTableColumnTask
          type={type}
          isFuture={true}
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
