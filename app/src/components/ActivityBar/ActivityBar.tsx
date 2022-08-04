import React from 'react';
import { useGetUserStatsQuery } from '../../redux/GSApi';
import { countUserStats } from '../../utils/stats/stats';
import { IconGraph } from '../UI/Icons/IconGraph';
import { Loader } from '../UI/Loader';
import { ProgressRound } from '../UI/ProgressRound';
import styles from './ActivityBar.module.scss';

export const ActivityBar = () => {
  const { data, isLoading } = useGetUserStatsQuery('');

  const fact = countUserStats(data);
  const normative = 20;

  return (
    <div className={styles.bar}>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.bar__info}>
          <div className={styles.activity}>
            <IconGraph />
            <div className={styles.activity__info}>
              <div className={styles.activity__header}>Активность сегодня:</div>
              {fact < normative && (
                <div className={styles.activity__subheader}>
                  На {normative - fact}
                  <span className={styles.activity__subheader_bad}>
                    {' '}
                    меньше{' '}
                  </span>
                  среднего
                </div>
              )}

              {fact > normative && (
                <div className={styles.activity__subheader}>
                  На {fact - normative}
                  <span className={styles.activity__subheader_good}>
                    {' '}
                    больше{' '}
                  </span>
                  среднего
                </div>
              )}

              {fact === normative && (
                <div className={styles.activity__subheader}>
                  Норматив
                  <span className={styles.activity__subheader_good}>
                    {' '}
                    выполнен{' '}
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className={styles.progress}>
            <ProgressRound normative={normative} fact={fact} />
          </div>
        </div>
      )}
      <div className={styles.bar__assistant}>
        <span>Помощь ассистента</span>
      </div>
    </div>
  );
};
