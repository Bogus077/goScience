import React, { useState } from 'react';
import { Kid } from '../../../models/Kid/kid';
import styles from './MotivationTableRow.module.scss';
import {
  ChangeSummaryStatusRequest,
  GetSummaryResponse,
  KidSummaryProjectTasks,
  KidSummaryTasks,
  KidSummaryUser,
} from '../../../models/summary/summary';
import { Checkbox } from '@mui/material';
import { formatDistance, subYears } from 'date-fns';
import ru from 'date-fns/locale/ru';
import { useChangeSummaryStatusMutation } from '../../../redux/GSApi';
import classNames from 'classnames/bind';
import { MotivationCreateSummary } from '../MotivationCreateSummary';
import { sortByDate } from '../../../utils/members/members';

const cx = classNames.bind(styles);

type MotivationTableRowProps = {
  kid: GetSummaryResponse[0];
  period: number;
};

export function MotivationTableRow({ kid, period }: MotivationTableRowProps) {
  const [triggerStatusChange, statusChangeQueryState] =
    useChangeSummaryStatusMutation();

  const handleChangeStatus = async ({
    id,
    dayStatus,
    weekStatus,
    type,
  }: {
    id: number;
    dayStatus: boolean;
    weekStatus: boolean;
    type: 'KidSummaryTasks' | 'KidSummaryUsers' | 'KidSummaryProjectTasks';
  }) => {
    const request: ChangeSummaryStatusRequest = {
      type: period === 1 ? 'day' : 'week',
      status: period === 1 ? !dayStatus : !weekStatus,
    };

    switch (type) {
      case 'KidSummaryTasks':
        request.KidSummaryTaskId = id;
        break;
      case 'KidSummaryUsers':
        request.KidSummaryUserId = id;
        break;
      case 'KidSummaryProjectTasks':
        request.KidSummaryProjectTaskId = id;
        break;
    }

    try {
      await triggerStatusChange(request).unwrap();
    } catch (e) {
      console.error(e);
    }
  };

  const renderTask = (
    task: KidSummaryTasks | KidSummaryUser | KidSummaryProjectTasks,
    type: 'KidSummaryTasks' | 'KidSummaryUsers' | 'KidSummaryProjectTasks'
  ) => {
    return (
      <div className={styles.task} key={task.id}>
        <Checkbox
          classes={{
            checked: styles.checked,
          }}
          className={styles.task__checkbox}
          checked={period === 1 ? task.dayStatus : task.weekStatus}
          onChange={() =>
            handleChangeStatus({
              id: task.id,
              dayStatus: task.dayStatus,
              weekStatus: task.weekStatus,
              type,
            })
          }
        />
        <div
          className={cx(styles.task__label, {
            task__label_checked:
              period === 1 ? task.dayStatus : task.weekStatus,
          })}
        >
          {task.label}
        </div>
        <div className={styles.task__createdAt}>
          {task.createdAt
            ? formatDistance(new Date(task.createdAt), new Date(), {
                addSuffix: true,
                locale: ru,
              })
            : ''}
        </div>
      </div>
    );
  };

  const kidSummaryUsers = kid.KidSummaryUsers ?? [];
  const kidSummaryTasks = kid.KidSummaryTasks ?? [];
  const KidSummaryProjectTasks = kid.KidSummaryProjectTasks ?? [];

  return (
    <div className={styles.row}>
      <div className={styles.name}>
        {kid.surname} {kid.name}
      </div>
      <div className={styles.summary}>
        <div className={styles.summary_positive}>
          <div className={styles.summary__header}>Итоги</div>
          <div className={styles.summary__content}>
            {kidSummaryTasks.length > 0 && (
              <div className={styles.summary__items}>
                {[...kidSummaryTasks]
                  .sort((a, b) =>
                    sortByDate(new Date(a.createdAt), new Date(b.createdAt))
                  )
                  .map((task) => renderTask(task, 'KidSummaryTasks'))}
              </div>
            )}
            {KidSummaryProjectTasks.length > 0 && (
              <div className={styles.summary__items}>
                {[...KidSummaryProjectTasks]
                  .sort((a, b) =>
                    sortByDate(new Date(a.createdAt), new Date(b.createdAt))
                  )
                  .map((task) => renderTask(task, 'KidSummaryProjectTasks'))}
              </div>
            )}
            {kidSummaryUsers.length > 0 && (
              <div className={styles.summary__items}>
                {[...kidSummaryUsers]
                  .sort((a, b) =>
                    sortByDate(new Date(a.createdAt), new Date(b.createdAt))
                  )
                  .map((task) => renderTask(task, 'KidSummaryUsers'))}
              </div>
            )}

            {kid.id && (
              <div className={styles.summary__items}>
                <MotivationCreateSummary
                  kidId={kid.id}
                  type={period === 1 ? 'day' : 'week'}
                />
              </div>
            )}
          </div>
        </div>
        {/* <div className={styles.summary_negative}>
          <div className={styles.summary__header}>Замечания</div>
        </div> */}
      </div>
    </div>
  );
}
