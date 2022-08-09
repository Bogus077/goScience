import React from 'react';
import { Team as TeamType } from '../../../models/Teams/teams';
import { countTeamPoints } from '../../../utils/points/points';
import { IconEditColored } from '../../UI/Icons/IconEditColored';
import classNames from 'classnames/bind';
import styles from './Team.module.scss';
import { TeamKid } from './TeamKid';
const cx = classNames.bind(styles);

type TeamTypes = {
  team: TeamType;
};

export const Team = ({ team }: TeamTypes) => {
  const points = countTeamPoints(team);
  const currentProject = team.Projects.filter(
    (project) => !project.isDeleted && !project.archived
  )[0];
  const createdDate = new Date(team.createdAt).toLocaleDateString();

  return (
    <div className={styles.team}>
      <div className={styles.team__points}>{points}</div>
      <div className={styles.team__createdAt}>Сформирована {createdDate}</div>
      <div className={styles.team__label}>
        <div className={styles.team__label_icon}>
          <IconEditColored size={15} />
        </div>
        <span>{team.label}</span>
      </div>
      <div className={styles.team__kids}>
        {team.Kids.map((kid) => (
          <TeamKid kid={kid} key={kid.id} />
        ))}
      </div>
      <div className={styles.team__project}>
        <span>Проект:</span>
        <div
          className={cx('team__project_link', {
            team__project_link_inactive: !currentProject,
          })}
        >
          {currentProject?.label ?? 'Нет текущего проекта'}
        </div>
      </div>
    </div>
  );
};
