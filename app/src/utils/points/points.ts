import { Team } from '../../models/Teams/teams';

export const POINTS = {
  positive: 2,
  warning: 9,
};

export const countTeamPoints = (team: Team) => {
  return team.Projects.reduce(
    (sum, project) =>
      sum +
      project.ProjectTasks.reduce(
        (sum, pt) => (pt.status === true ? sum + pt.points : sum),
        0
      ),
    0
  );
};
