import React, { useState } from 'react';
import { TaskTypes } from '../../../models/Tasks/tasks';
import {
  useChangeTaskStatusMutation,
  useRemoveTaskMutation,
} from '../../../redux/GSApi';
import { ConfirmModal } from '../ConfirmModal';
import { IconCheck } from '../Icons/Forms/IconCheck';
import { IconCross } from '../Icons/Forms/IconCross';
import { IconEdit } from '../Icons/Tables/IconEdit';
import styles from './TaskDo.module.scss';

type TaskDoTypes = {
  id: number;
  type: TaskTypes;
  handleResetActiveTasks?: () => void;
};

export const TaskDo = ({ id, type, handleResetActiveTasks }: TaskDoTypes) => {
  const [isRemoveModal, setRemoveModal] = useState(false);
  const [removeTask, { isLoading: IsRemoveLoading }] = useRemoveTaskMutation();
  const [changeStatus, { isLoading: isChangeLoading }] =
    useChangeTaskStatusMutation();

  const [check, setCheck] = useState(false);
  const [remove, setRemove] = useState(false);

  const handleCheckTask = async () => {
    if (isChangeLoading) return;

    const newStatus = {
      type,
      status: true,
      id,
    };
    await changeStatus(newStatus);
    if (handleResetActiveTasks) handleResetActiveTasks();
  };

  const handleEditTask = () => {};
  const handleRemoveTask = async () => {
    if (IsRemoveLoading) return;

    const newStatus = {
      type,
      id,
    };

    setRemoveModal(false);
    await removeTask(newStatus);
    if (handleResetActiveTasks) handleResetActiveTasks();
  };

  return (
    <div className={styles.do}>
      <div className={styles.do__content}>
        <div
          onMouseEnter={() => setCheck(true)}
          onMouseLeave={() => setCheck(false)}
          onClick={handleCheckTask}
        >
          <IconCheck disabled={!check} />
        </div>

        <div className={styles.do__icon} onClick={handleEditTask}>
          <IconEdit size={15} />
        </div>
        <div
          className={styles.do__icon}
          onMouseEnter={() => setRemove(true)}
          onMouseLeave={() => setRemove(false)}
          onClick={() => setRemoveModal(true)}
        >
          <IconCross disabled={!remove} />
        </div>
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
