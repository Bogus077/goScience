import {
  ActiveTasks,
  Task,
  TaskDay,
  TaskMonth,
  TaskTypes,
  TaskWeek,
} from '../../models/Tasks/tasks';
import { isOneDate } from '../DateTime/DateTime';

export const getActiveTasks = (
  task: TaskDay | TaskWeek | TaskMonth | Task,
  tasksDays: TaskDay[],
  tasksWeeks: TaskWeek[],
  tasksMonths: TaskMonth[],
  tasksQuarters: Task[]
) => {
  const result: ActiveTasks = {
    days: [],
    weeks: [],
    months: [],
    quarter: [],
  };

  if ('TasksWeekId' in task) {
    //Добавляем дни
    result.days = [task.id];

    //Добавляем недели
    if (task.TasksWeekId) {
      result.weeks = [task.TasksWeekId];
      const taskWeek = tasksWeeks.find((tw) => tw.id === task.TasksWeekId);

      //Добавляем месяцы
      if (taskWeek?.TasksMonthId) {
        result.months = [taskWeek.TasksMonthId];
        const taskMonth = tasksMonths.find(
          (tm) => tm.id === taskWeek.TasksMonthId
        );

        //Добавляем четверти
        if (taskMonth?.TasksQuarterId) {
          result.quarter = [taskMonth.TasksQuarterId];
        }
      }
    }
  } else if ('TasksMonthId' in task) {
    //Добавляем дни
    const tasksDay = tasksDays.filter((td) => td.TasksWeekId === task.id);
    if (tasksDay.length > 0) result.days = tasksDay.map((td) => td.id);

    //Добавляем недели
    result.weeks = [task.id];

    //Добавляем месяцы
    if (task.TasksMonthId) {
      result.months = [task.TasksMonthId];
      const taskMonth = tasksMonths.find((tm) => tm.id === task.TasksMonthId);

      //Добавляем четверти
      if (taskMonth?.TasksQuarterId) {
        result.quarter = [taskMonth.TasksQuarterId];
      }
    }
  } else if ('TasksQuarterId' in task) {
    //Добавляем четверти
    if (task.TasksQuarterId) {
      result.quarter = [task.TasksQuarterId];
    }

    //Добавляем месяцы
    result.months = [task.id];

    //Добавляем недели
    const tasksWeek = tasksWeeks.filter((tw) => tw.TasksMonthId === task.id);
    if (tasksWeek.length > 0) {
      const tasksWeekIds = tasksWeek.map((tw) => tw.id);
      result.weeks = tasksWeekIds;

      //Добавляем дни
      const tasksDay = tasksDays.filter(
        (td) => td.TasksWeekId && tasksWeekIds.includes(td.TasksWeekId)
      );
      if (tasksDay.length > 0) {
        const tasksDayIds = tasksDay.map((td) => td.id);
        result.days = tasksDayIds;
      }
    }
  } else {
    //Добавляем четверть
    result.quarter = [task.id];

    //Добавляем месяцы
    const tasksMonth = tasksMonths.filter(
      (tm) => tm.TasksQuarterId === task.id
    );
    if (tasksMonth.length > 0) {
      const tasksMonthIds = tasksMonth.map((tm) => tm.id);
      result.months = tasksMonthIds;

      //Добавляем недели
      const tasksWeek = tasksWeeks.filter(
        (tw) => tw.TasksMonthId && tasksMonthIds.includes(tw.TasksMonthId)
      );
      if (tasksWeek.length > 0) {
        const tasksWeekIds = tasksWeek.map((tw) => tw.id);
        result.weeks = tasksWeekIds;

        //Добавляем дни
        const tasksDay = tasksDays.filter(
          (td) => td.TasksWeekId && tasksWeekIds.includes(td.TasksWeekId)
        );
        if (tasksDay.length > 0) {
          const tasksDayIds = tasksDay.map((td) => td.id);
          result.days = tasksDayIds;
        }
      }
    }
  }

  return result;
};

export const isActiveTasksEmpty = (activeTasks: ActiveTasks) => {
  return (
    activeTasks.days.length === 0 &&
    activeTasks.weeks.length === 0 &&
    activeTasks.months.length === 0 &&
    activeTasks.quarter.length === 0
  );
};

export const countTasksPoints = (tasks: Task[]) => {
  const points = tasks.reduce(
    (sum: number, current: Task) => sum + current.points,
    0
  );
  return points;
};

export const separateTasks = (
  tasks: TaskDay[] | TaskWeek[] | TaskMonth[] | Task[],
  type: TaskTypes
) => {
  const currentTasks: TaskDay[] | TaskWeek[] | TaskMonth[] | Task[] = [];
  const futureTasks: TaskDay[] | TaskWeek[] | TaskMonth[] | Task[] = [];
  const lateTasks: TaskDay[] | TaskWeek[] | TaskMonth[] | Task[] = [];
  const today = new Date();
  today.setHours(0);
  today.setMinutes(0);
  today.setSeconds(0);
  const tommorow = new Date();
  tommorow.setDate(tommorow.getDate() + 1);
  tommorow.setHours(0);
  tommorow.setMinutes(0);
  tommorow.setSeconds(0);
  tommorow.setSeconds(-1);

  tasks.forEach((task) => {
    const taskDate = new Date(task.date);

    if (type === 'day') {
      if (isOneDate(taskDate, today)) {
        currentTasks.push(task);
      } else if (taskDate < today) {
        lateTasks.push(task);
      } else {
        futureTasks.push(task);
      }
    }

    if (type === 'week') {
      const taskFinishDate = new Date(taskDate);
      taskFinishDate.setDate(taskFinishDate.getDate() + 7);
      taskFinishDate.setSeconds(-1);

      if (taskDate > tommorow) {
        futureTasks.push(task);
      } else if (taskFinishDate < today) {
        lateTasks.push(task);
      } else {
        currentTasks.push(task);
      }
    }

    if (type === 'month') {
      const taskFinishDate = new Date(taskDate);
      taskFinishDate.setDate(taskFinishDate.getDate() + 30);
      taskFinishDate.setSeconds(-1);

      if (taskDate > tommorow) {
        futureTasks.push(task);
      } else if (taskFinishDate < today) {
        lateTasks.push(task);
      } else {
        currentTasks.push(task);
      }
    }

    if (type === 'quarter') {
      const taskFinishDate = new Date(taskDate);
      taskFinishDate.setDate(taskFinishDate.getDate() + 90);
      taskFinishDate.setSeconds(-1);

      if (taskDate > tommorow) {
        futureTasks.push(task);
      } else if (taskFinishDate < today) {
        lateTasks.push(task);
      } else {
        currentTasks.push(task);
      }
    }
  });

  return { currentTasks, lateTasks, futureTasks };
};
