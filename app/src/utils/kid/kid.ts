import { Kid } from '../../models/Kid/kid';

export const countKidActivity = (kid: Kid) => {
  if (kid.StatsTasks && kid.StatsTasks.length > 0) {
    return kid.StatsTasks.reduce((sum, stat) => sum + stat.points, 0);
  } else {
    return 0;
  }
};
