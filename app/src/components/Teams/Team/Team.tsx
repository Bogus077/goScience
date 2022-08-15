import React from 'react';
import { Team as TeamType } from '../../../models/Teams/teams';
import { countTeamPoints } from '../../../utils/points/points';
import { IconEditColored } from '../../UI/Icons/IconEditColored';
import classNames from 'classnames/bind';
import styles from './Team.module.scss';
import { TeamKid } from './TeamKid';
import { useNavigate } from 'react-router-dom';
import { frontendRoutes } from '../../../utils/router/routes';
import { getNormalEnding } from '../../../utils/text/text';
const cx = classNames.bind(styles);

type TeamTypes = {
  team: TeamType;
};

export const Team = ({ team }: TeamTypes) => {
  const navigate = useNavigate();
  const points = countTeamPoints(team);
  const currentProject = team.Projects.filter(
    (project) => !project.isDeleted && !project.archived
  )[0];
  const createdDaysAgo = Math.ceil(
    (new Date().getTime() - new Date(team.createdAt).getTime()) /
      1000 /
      3600 /
      24
  );
  const createdDatePrint = `Сформирована ${createdDaysAgo} ${getNormalEnding(
    createdDaysAgo,
    'день',
    'дня',
    'дней'
  )} назад`;

  return (
    <div className={styles.team}>
      <div className={styles.team__points}>{points}</div>
      <div className={styles.team__createdAt}>{createdDatePrint}</div>
      <div
        className={styles.team__label}
        onClick={() => navigate(`${frontendRoutes.plan.updateTeam}/${team.id}`)}
      >
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
          {currentProject?.label ? (
            <a href={`#${currentProject.id.toString()}`}>
              {currentProject?.label}
            </a>
          ) : (
            'Нет текущего проекта'
          )}
        </div>
      </div>
    </div>
  );
};
