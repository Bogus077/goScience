import React, { useState } from 'react';
import { TaskTypes } from '../../../models/Tasks/tasks';
import {
  useAddDayToTaskMutation,
  useChangeTaskStatusMutation,
  useRemoveTaskMutation,
} from '../../../redux/GSApi';
import { ConfirmModal } from '../ConfirmModal';
import { IconCheck } from '../Icons/Forms/IconCheck';
import { IconCross } from '../Icons/Forms/IconCross';
import { IconEdit } from '../Icons/Tables/IconEdit';
import styles from './TaskDo.module.scss';
import { IconAddDay } from '../Icons/Forms/IconAddDay';

type TaskDoTypes = {
  id: number;
  type: TaskTypes;
  handleResetActiveTasks?: () => void;
  setIsLoading?: (value: React.SetStateAction<boolean>) => void;
};

export const TaskDo = ({
  id,
  type,
  handleResetActiveTasks,
  setIsLoading,
}: TaskDoTypes) => {
  const [isRemoveModal, setRemoveModal] = useState(false);
  const [removeTask, { isLoading: isRemoveLoading }] = useRemoveTaskMutation();
  const [changeStatus, { isLoading: isChangeLoading }] =
    useChangeTaskStatusMutation();
  const [addDayToTask, { isLoading: isAddDayLoading }] =
    useAddDayToTaskMutation();

  const [check, setCheck] = useState(false);
  const [remove, setRemove] = useState(false);
  const [addDay, setAddDay] = useState(false);

  const handleCheckTask = async () => {
    if (isChangeLoading) return;
    setIsLoading?.(true);

    const newStatus = {
      type,
      status: true,
      id,
    };
    await changeStatus(newStatus);
    setIsLoading?.(false);

    if (handleResetActiveTasks) handleResetActiveTasks();
  };

  const handleAddDayToTask = async () => {
    if (isAddDayLoading) return;
    setIsLoading?.(true);

    await addDayToTask({ id });
    setIsLoading?.(false);

    if (handleResetActiveTasks) handleResetActiveTasks();
  };

  const handleEditTask = () => {};
  const handleRemoveTask = async () => {
    if (isRemoveLoading) return;
    setIsLoading?.(true);

    const newStatus = {
      type,
      id,
    };

    setRemoveModal(false);
    await removeTask(newStatus);
    setIsLoading?.(false);

    if (handleResetActiveTasks) handleResetActiveTasks();
  };

  return (
    <div className={styles.do}>
      <div className={styles.do__content}>
        <div
          onMouseEnter={() => setCheck(true)}
          onMouseLeave={() => setCheck(false)}
          onClick={handleCheckTask}
          title="Выполнено"
        >
          <IconCheck disabled={!check} />
        </div>

        {/* <div className={styles.do__icon} onClick={handleEditTask}>
          <IconEdit size={15} />
        </div> */}
        <div
          className={styles.do__icon}
          onMouseEnter={() => setRemove(true)}
          onMouseLeave={() => setRemove(false)}
          onClick={() => setRemoveModal(true)}
          title="Удалить задачу"
        >
          <IconCross disabled={!remove} />
        </div>
        {type === 'day' && (
          <div
            className={styles.do__icon}
            onMouseEnter={() => setAddDay(true)}
            onMouseLeave={() => setAddDay(false)}
            onClick={handleAddDayToTask}
            title="Добавить день"
          >
            <IconAddDay disabled={!addDay} />
          </div>
        )}
      </div>
      <div className={styles.triangle} />
      <ConfirmModal
        isOpen={isRemoveModal}
        titleText="Удаление задачи"
        message="Вы действительно хотите удалить задачу? Это действие необратимо"
        rejectText="Отмена"
        acceptText="Удалить"
        onReject={() => setRemoveModal(false)}
        onAccept={handleRemoveTask}
      />
    </div>
  );
};
