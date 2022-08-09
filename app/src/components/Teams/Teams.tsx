import React from 'react';
import { Team as TeamType } from '../../models/Teams/teams';
import { Team } from './Team';
import styles from './Team.module.scss';

type TeamTypes = {
  teams: TeamType[];
};

export const Teams = ({ teams }: TeamTypes) => {
  return (
    <div className={styles.teams}>
      {teams.map((team) => (
        <Team team={team} key={team.id} />
      ))}
      <div className={styles.teams__add}>
        <span>+</span>
        <span>Создать команду</span>
      </div>
    </div>
  );
};
