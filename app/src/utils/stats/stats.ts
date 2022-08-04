import { StatsTask } from '../../models/Stats/stats';

export const countUserStats = (stats?: StatsTask[]) => {
  if (stats && stats.length > 0) {
    return stats.reduce((sum, stat) => sum + stat.points, 0);
  } else {
    return 0;
  }
};
