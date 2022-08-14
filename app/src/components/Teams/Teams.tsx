import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Team as TeamType } from '../../models/Teams/teams';
import { frontendRoutes } from '../../utils/router/routes';
import { Team } from './Team';
import styles from './Team.module.scss';

type TeamTypes = {
  teams: TeamType[];
};

export const Teams = ({ teams }: TeamTypes) => {
  const navigate = useNavigate();

  return (
    <div className={styles.teams}>
      {teams.map((team) => (
        <Team team={team} key={team.id} />
      ))}
      <div
        className={styles.teams__add}
        onClick={() => navigate(frontendRoutes.plan.createTeam)}
      >
        <span>+</span>
        <span>Создать команду</span>
      </div>
    </div>
  );
};
