import React, { useCallback, useState } from 'react';
import styles from './StudyTableRow.module.scss';
import classNames from 'classnames/bind';
import { IconArrow } from '../../UI/Icons/MainMenu/IconArrow';
import { UserCol } from '../../UserCol';
import { Indicator } from '../../UI/Indicator';
import { StudyTableColumn } from '../StudyTableColumn';
import { Kid } from '../../../models/Kid/kid';
import { ActiveTasks, Task } from '../../../models/Tasks/tasks';
import {
  countTasksPoints,
  isActiveTasksEmpty,
} from '../../../utils/tasks/tasks';
const cx = classNames.bind(styles);

type TableRowTypes = {
  activity: number;
  kid: Kid;
  extended?: number;
  setExtended: React.Dispatch<React.SetStateAction<number | undefined>>;
};

export const StudyTableRow = ({
  activity,
  kid,
  extended,
  setExtended,
}: TableRowTypes) => {
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
        <UserCol activity={activity} name={kid.name} lastName={kid.surname} />
        <div className={styles.row__tasks}>
          <>123</>
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
            points={countTasksPoints(kid.TasksDays ?? [])}
          />
          <Indicator
            text="Неделя"
            points={countTasksPoints(kid.TasksWeeks ?? [])}
          />
          <Indicator
            text="Месяц"
            points={countTasksPoints(kid.TasksMonths ?? [])}
          />
          <Indicator
            text="Четверть"
            points={countTasksPoints(kid.TasksQuarters ?? [])}
          />
        </div>
      </div>

      <div
        className={cx('inner', {
          inner_extended: extended === kid.id,
        })}
      >
        <StudyTableColumn
          type="day"
          header="День"
          points={countTasksPoints(kid.TasksDays ?? [])}
          tasksDays={kid.TasksDays ?? []}
          tasksWeeks={kid.TasksWeeks ?? []}
          tasksMonths={kid.TasksMonths ?? []}
          tasksQuarters={kid.TasksQuarters ?? []}
          tasks={kid.TasksDays ?? []}
          activeTasks={activeTasks}
          setActiveTasks={setActiveTasks}
        />
        <StudyTableColumn
          type="week"
          header="Неделя"
          points={countTasksPoints(kid.TasksWeeks ?? [])}
          tasksDays={kid.TasksDays ?? []}
          tasksWeeks={kid.TasksWeeks ?? []}
          tasksMonths={kid.TasksMonths ?? []}
          tasksQuarters={kid.TasksQuarters ?? []}
          tasks={kid.TasksWeeks ?? []}
          activeTasks={activeTasks}
          setActiveTasks={setActiveTasks}
        />
        <StudyTableColumn
          type="month"
          header="Месяц"
          points={countTasksPoints(kid.TasksMonths ?? [])}
          tasksDays={kid.TasksDays ?? []}
          tasksWeeks={kid.TasksWeeks ?? []}
          tasksMonths={kid.TasksMonths ?? []}
          tasksQuarters={kid.TasksQuarters ?? []}
          tasks={kid.TasksMonths ?? []}
          activeTasks={activeTasks}
          setActiveTasks={setActiveTasks}
        />
        <StudyTableColumn
          type="quarter"
          header="Четверть"
          points={countTasksPoints(kid.TasksQuarters ?? [])}
          tasksDays={kid.TasksDays ?? []}
          tasksWeeks={kid.TasksWeeks ?? []}
          tasksMonths={kid.TasksMonths ?? []}
          tasksQuarters={kid.TasksQuarters ?? []}
          tasks={kid.TasksQuarters ?? []}
          activeTasks={activeTasks}
          setActiveTasks={setActiveTasks}
        />
      </div>
    </div>
  );
};
