import { User } from '../../models/User/user';

export const isUserAdmin = (user: User) => {
  const roles = user.Roles.map((role) => role.name);
  return roles.includes('admin');
};
