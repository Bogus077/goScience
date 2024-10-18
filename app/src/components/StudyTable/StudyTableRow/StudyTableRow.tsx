import React, { useCallback, useState } from 'react';
import styles from './StudyTableRow.module.scss';
import Markdown from 'markdown-to-jsx';
import classNames from 'classnames/bind';
import { IconArrow } from '../../UI/Icons/MainMenu/IconArrow';
import { UserCol } from '../../UserCol';
import { Indicator } from '../../UI/Indicator';
import { StudyTableColumn } from '../StudyTableColumn';
import { Kid } from '../../../models/Kid/kid';
import { ActiveTasks } from '../../../models/Tasks/tasks';
import {
  countTasksPoints,
  isActiveTasksEmpty,
  separateTasks,
} from '../../../utils/tasks/tasks';
import { countKidActivity } from '../../../utils/kid/kid';
import { Task } from '../../UI/Task';
import { StudyTableFastAdd } from '../StudyTableFastAdd';
import { IconHelp } from '../../UI/Icons/Forms/IconHelp';
import Skeleton from '@mui/material/Skeleton';
import { useHelpAssistant } from '../../../hooks/useHelpAssistant';
const cx = classNames.bind(styles);

type TableRowTypes = {
  kid: Kid;
  extended?: number;
  isFetching?: boolean;
  setExtended: React.Dispatch<React.SetStateAction<number | undefined>>;
};

export const StudyTableRow = ({
  kid,
  extended,
  isFetching,
  setExtended,
}: TableRowTypes) => {
  const {
    messages,
    loading: isAssistantLoading,
    getHelpAssistant,
  } = useHelpAssistant({
    type: 'tasks',
    params: { KidId: kid.id?.toString() },
  });

  const [activeTasks, setActiveTasks] = useState<ActiveTasks>({
    days: [],
    weeks: [],
    months: [],
    quarter: [],
  });

  const handleResetActiveTasks = useCallback(() => {
    setActiveTasks({
      days: [],
      weeks: [],
      months: [],
      quarter: [],
    });
  }, []);

  const dayTasks = separateTasks(kid.TasksDays ?? [], 'day');
  const weekTasks = separateTasks(kid.TasksWeeks ?? [], 'week');
  const monthTasks = separateTasks(kid.TasksMonths ?? [], 'month');
  const quarterTasks = separateTasks(kid.TasksQuarters ?? [], 'quarter');

  return (
    <div className={styles.row__wrapper}>
      <div className={styles.row}>
        <div
          className={cx('row__arrow', {
            row__arrow_active: extended === kid.id,
          })}
          onClick={() =>
            extended === kid.id ? setExtended(undefined) : setExtended(kid.id)
          }
        >
          <IconArrow size={11} />
        </div>
        <UserCol
          activity={countKidActivity(kid)}
          name={kid.name}
          lastName={kid.surname}
        />
        <div className={styles.row__tasks}>
          <StudyTableFastAdd kid={kid} />
          {dayTasks.lateTasks.map((task) => (
            <Task task={task} key={task.id} />
          ))}
          {dayTasks.currentTasks.map((task) => (
            <Task task={task} key={task.id} />
          ))}

          <div
            className={cx('row__resetActiveTasks', {
              row__resetActiveTasks_active: !isActiveTasksEmpty(activeTasks),
            })}
            onClick={handleResetActiveTasks}
          >
            Сбросить выделение
          </div>
        </div>
        <div className={styles.row__indicators}>
          <Indicator
            text="День"
            points={countTasksPoints([
              ...dayTasks.currentTasks,
              ...dayTasks.lateTasks,
            ])}
          />
          <Indicator
            text="Неделя"
            points={countTasksPoints([
              ...weekTasks.currentTasks,
              ...weekTasks.lateTasks,
            ])}
          />
          <Indicator
            text="Месяц"
            points={countTasksPoints([
              ...monthTasks.currentTasks,
              ...monthTasks.lateTasks,
            ])}
          />
          <Indicator
            text="Четверть"
            points={countTasksPoints([
              ...quarterTasks.currentTasks,
              ...quarterTasks.lateTasks,
            ])}
          />
        </div>
      </div>

      <div
        className={cx('inner', {
          inner_extended: extended === kid.id,
        })}
      >
        <div
          className={styles.helper}
          onClick={
            isAssistantLoading || messages.length > 0
              ? undefined
              : getHelpAssistant
          }
        >
          <div
            className={styles.helper__button}
            title="Помощь ассистента"
            onClick={
              isAssistantLoading || messages.length > 0
                ? undefined
                : getHelpAssistant
            }
          >
            <IconHelp disabled={isAssistantLoading || messages.length > 0} />
          </div>
          <div className={styles.helper__text}>
            {isAssistantLoading && messages.length === 0 ? (
              <div className={styles.helper__skeleton}>
                <Skeleton />
                <Skeleton />
                <Skeleton />
              </div>
            ) : messages.length > 0 ? (
              <div className={styles.helper__content}>
                {<Markdown>{messages.join('')}</Markdown>}
              </div>
            ) : (
              'Помощь ассистента'
            )}
          </div>
        </div>
        <StudyTableColumn
          type="day"
          header="День"
          points={countTasksPoints([
            ...dayTasks.currentTasks,
            ...dayTasks.lateTasks,
          ])}
          tasksDays={kid.TasksDays ?? []}
          tasksWeeks={kid.TasksWeeks ?? []}
          tasksMonths={kid.TasksMonths ?? []}
          tasksQuarters={kid.TasksQuarters ?? []}
          tasks={dayTasks}
          activeTasks={activeTasks}
          setActiveTasks={setActiveTasks}
          handleResetActiveTasks={handleResetActiveTasks}
          isFetching={isFetching}
        />
        <StudyTableColumn
          type="week"
          header="Неделя"
          points={countTasksPoints([
            ...weekTasks.currentTasks,
            ...weekTasks.lateTasks,
          ])}
          tasksDays={kid.TasksDays ?? []}
          tasksWeeks={kid.TasksWeeks ?? []}
          tasksMonths={kid.TasksMonths ?? []}
          tasksQuarters={kid.TasksQuarters ?? []}
          tasks={weekTasks}
          activeTasks={activeTasks}
          setActiveTasks={setActiveTasks}
          handleResetActiveTasks={handleResetActiveTasks}
          isFetching={isFetching}
        />
        <StudyTableColumn
          type="month"
          header="Месяц"
          points={countTasksPoints([
            ...monthTasks.currentTasks,
            ...monthTasks.lateTasks,
          ])}
          tasksDays={kid.TasksDays ?? []}
          tasksWeeks={kid.TasksWeeks ?? []}
          tasksMonths={kid.TasksMonths ?? []}
          tasksQuarters={kid.TasksQuarters ?? []}
          tasks={monthTasks}
          activeTasks={activeTasks}
          setActiveTasks={setActiveTasks}
          handleResetActiveTasks={handleResetActiveTasks}
          isFetching={isFetching}
        />
        <StudyTableColumn
          type="quarter"
          header="Четверть"
          points={countTasksPoints([
            ...quarterTasks.currentTasks,
            ...quarterTasks.lateTasks,
          ])}
          tasksDays={kid.TasksDays ?? []}
          tasksWeeks={kid.TasksWeeks ?? []}
          tasksMonths={kid.TasksMonths ?? []}
          tasksQuarters={kid.TasksQuarters ?? []}
          tasks={quarterTasks}
          activeTasks={activeTasks}
          setActiveTasks={setActiveTasks}
          handleResetActiveTasks={handleResetActiveTasks}
          isFetching={isFetching}
        />
      </div>
    </div>
  );
};
