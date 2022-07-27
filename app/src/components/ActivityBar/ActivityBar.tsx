import React from 'react';
import { IconGraph } from '../UI/Icons/IconGraph';
import { ProgressRound } from '../UI/ProgressRound';
import styles from './ActivityBar.module.scss';

type Props = {
  normative: number;
  fact: number;
};

export const ActivityBar = ({ normative, fact }: Props) => {
  return (
    <div className={styles.bar}>
      <div className={styles.bar__info}>
        <div className={styles.activity}>
          <IconGraph />
          <div className={styles.activity__info}>
            <div className={styles.activity__header}>Активность сегодня:</div>
            {fact < normative && (
              <div className={styles.activity__subheader}>
                На {normative - fact}
                <span className={styles.activity__subheader_bad}> меньше </span>
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
      <div className={styles.bar__assistant}>
        <span>Помощь ассистента</span>
      </div>
    </div>
  );
};
