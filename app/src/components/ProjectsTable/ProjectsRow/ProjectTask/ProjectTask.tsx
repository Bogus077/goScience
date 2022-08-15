import React, { useCallback, useState } from 'react';
import { ProjectTask as ProjectTaskType } from '../../../../models/Project/Project';
import { TeamKid } from '../../../Teams/Team/TeamKid';
import classNames from 'classnames/bind';
import styles from './ProjectTask.module.scss';
import { POINTS } from '../../../../utils/points/points';
import { useNavigate } from 'react-router-dom';
import { frontendRoutes } from '../../../../utils/router/routes';
import { getNormalEnding } from '../../../../utils/text/text';
import { Submenu } from '../../../UI/Submenu';
import { ConfirmModal } from '../../../UI/ConfirmModal';
import {
  useDoneProjectTaskMutation,
  useRemoveProjectTaskMutation,
} from '../../../../redux/GSApi';
import { Loader } from '../../../UI/Loader';
const cx = classNames.bind(styles);

type ProjectTaskTypes = {
  task: ProjectTaskType;
};

export const ProjectTask = ({ task }: ProjectTaskTypes) => {
  const [removeModal, setRemoveModal] = useState(false);
  const [doneModal, setDoneModal] = useState(false);
  const navigate = useNavigate();
  const dayasLeft = Math.floor(
    (new Date(task.date).getTime() - new Date().getTime()) / 1000 / 3600 / 24
  );

  const [removeTask, { isLoading: isRemoveLoading }] =
    useRemoveProjectTaskMutation();
  const [doneTask, { isLoading: isDoneLoading }] = useDoneProjectTaskMutation();

  const handleRemove = useCallback(() => {
    removeTask({ ProjectTaskId: task.id });
    setRemoveModal(false);
  }, [removeTask, task.id]);

  const handleDone = useCallback(() => {
    doneTask({ ProjectTaskId: task.id });
    setDoneModal(false);
  }, [doneTask, task.id]);

  const links = [
    {
      title: 'Изменить задачу',
      onClick: () => navigate(`${frontendRoutes.project.editTask}/${task.id}`),
    },
    {
      title: 'Удалить задачу',
      onClick: () => setRemoveModal(true),
    },
  ];

  if (!task.status)
    links.push({
      title: 'Выполнить',
      onClick: () => setDoneModal(true),
    });

  return (
    <div
      className={cx('task', {
        task_inactive: task.Kids.length === 0,
        task_done: task.status,
      })}
    >
      {isRemoveLoading || isDoneLoading ? (
        <Loader />
      ) : (
        <>
          <div className={styles.task__submenu}>
            <Submenu links={links} />
          </div>
          <div
            className={styles.task__header}
            onClick={() =>
              navigate(`${frontendRoutes.project.editTask}/${task.id}`)
            }
          >
            {task.label}
          </div>
          <div className={styles.task__subheader}>
            {task.status
              ? 'Выполнено'
              : dayasLeft >= 0
              ? `${getNormalEnding(
                  dayasLeft,
                  'Остался',
                  'Осталось',
                  'Осталось'
                )} ${dayasLeft} ${getNormalEnding(
                  dayasLeft,
                  'день',
                  'дня',
                  'дней'
                )}`
              : `Просрочено на ${Math.abs(dayasLeft)} ${getNormalEnding(
                  Math.abs(dayasLeft),
                  'день',
                  'дня',
                  'дней'
                )}`}
          </div>
          <div className={styles.task__description}>
            {task.description === '' ? 'Без описания' : task.description}
          </div>
          <div className={styles.task__kids}>
            {task.Kids.length === 0 ? (
              <div className={styles.task__resp}>Ответственный не назначен</div>
            ) : (
              task.Kids.map((kid) => <TeamKid kid={kid} key={kid.id} />)
            )}
          </div>
          <div
            className={cx('mark', {
              mark_warning:
                task.points > POINTS.positive && task.points <= POINTS.warning,
              mark_negative: task.points > POINTS.warning,
              mark_disabled: task.Kids.length === 0,
            })}
          >
            {task.points}
          </div>
        </>
      )}

      <ConfirmModal
        isOpen={removeModal}
        titleText="Удалить задачу"
        message={`Вы действительно хотите удалить задачу: ${task.label}? Это действие необратимо.`}
        type="negative"
        acceptText="Удалить"
        rejectText="Отменить удаление"
        onAccept={handleRemove}
        onReject={() => setRemoveModal(false)}
      />

      <ConfirmModal
        isOpen={doneModal}
        titleText="Выполнить задачу"
        message={`Вы действительно хотите отметить выполненной задачу: ${task.label}?`}
        type="positive"
        acceptText="Выполнить"
        rejectText="Отменить"
        onAccept={handleDone}
        onReject={() => setDoneModal(false)}
      />
    </div>
  );
};
