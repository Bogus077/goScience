import React from 'react';
import classNames from 'classnames/bind';
import styles from './TeamChooser.module.scss';
import { Team } from '../../../models/Teams/teams';
const cx = classNames.bind(styles);

type TeamChooserTypes = {
  teams: Team[];
  type?: 'single' | 'multiple';
  active: number[];
  setActive: React.Dispatch<React.SetStateAction<number[]>>;
};

export const TeamChooser = ({
  teams,
  type = 'single',
  active,
  setActive,
}: TeamChooserTypes) => {
  const handleClick = (id: number) => {
    if (active.includes(id)) {
      const next = active.filter((kidId) => kidId !== id);
      setActive(next);
    } else {
      const next = type === 'single' ? [id] : [...active, id];
      setActive(next);
    }
  };

  return (
    <div className={styles.chooser}>
      {teams.map((team) => (
        <div
          className={cx('chooser__item', {
            chooser__item_active: active.includes(team.id ?? 0),
          })}
          key={team.id}
          onClick={() => handleClick(team.id ?? 0)}
        >
          {team.label}
        </div>
      ))}
    </div>
  );
};
