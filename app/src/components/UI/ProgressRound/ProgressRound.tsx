import React from 'react';
import classNames from 'classnames/bind';
import styles from './ProgressRound.module.scss';
const cx = classNames.bind(styles);

type Props = {
  normative: number;
  fact: number;
};

export const ProgressRound = ({ normative, fact }: Props) => {
  return (
    <div
      className={cx('round', {
        round_25: fact >= normative / 4,
        round_50: fact >= normative / 2,
        round_75: fact >= (normative / 4) * 3,
        round_100: fact >= normative,
      })}
    >
      <span className={styles.fact}>{fact}</span>
    </div>
  );
};
