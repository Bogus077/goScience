import React, { useState } from 'react';
import { IconCheck } from '../Icons/Forms/IconCheck';
import { IconCross } from '../Icons/Forms/IconCross';
import { IconSettings } from '../Icons/MainMenu/IconSettings';
import { IconEdit } from '../Icons/Tables/IconEdit';
import styles from './TaskDo.module.scss';

type TaskDoTypes = {
  id: number;
};

export const TaskDo = ({ id }: TaskDoTypes) => {
  const [check, setCheck] = useState(false);
  const [remove, setRemove] = useState(false);

  const handleCheckTask = () => {};
  const handleEditTask = () => {};
  const handleRemoveTask = () => {};

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
          onClick={handleRemoveTask}
        >
          <IconCross disabled={!remove} />
        </div>
      </div>
      <div className={styles.triangle} />
    </div>
  );
};
